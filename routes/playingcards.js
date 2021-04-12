const express = require('express');
const router = express.Router();
const asyncCatcher = require('../utilities/asyncCatcher');
const { playingCardSchema } = require('../joiSchemas');
const AppError = require('../utilities/AppError');
const {
	isAuthenticated,
	isCreator,
	validatePlayingCard,
} = require('../middleware/middleware');

const PlayingCard = require('../models/playingCard');

router.get(
	'/',
	asyncCatcher(async (req, res) => {
		const playingCards = await PlayingCard.find({});
		res.render('playingCards/index', { playingCards });
	})
);

// Render New form
router.get('/new', isAuthenticated, (req, res) => {
	res.render('playingCards/new');
});

// Create A New Playing Card | EJS: SHOW
router.post(
	'/',
	isAuthenticated,
	validatePlayingCard,
	asyncCatcher(async (req, res) => {
		const playingCard = new PlayingCard(req.body.playingCard);
		playingCard.submittedBy = req.user._id;
		await playingCard.save();
		req.flash('success', 'New Playing Card was successfully added!');
		res.redirect(`/playingCards/${playingCard.id}`);
	})
);

// Render the edit form
router.get(
	'/:id/edit',
	isAuthenticated,
	isCreator,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		const playingCard = await PlayingCard.findById(id);
		if (!playingCard) {
			req.flash('error', 'Playing Card does not exist!');
			res.redirect('/playingcards');
		}
		res.render('playingCards/edit', { playingCard });
	})
);

// Render Show page
router.get(
	'/:id',
	asyncCatcher(async (req, res, next) => {
		const { id } = req.params;
		const playingCard = await PlayingCard.findById(id)
			.populate({
				path: 'reviews',
				populate: {
					path: 'author',
				},
			})
			.populate('submittedBy');
		console.log(playingCard);
		if (!playingCard) {
			req.flash('error', 'Playing Card does not exist!');
			res.redirect('/playingcards');
		}
		res.render('playingCards/show', { playingCard });
	})
);

// Update playing card
router.put(
	'/:id',
	isAuthenticated,
	isCreator,
	validatePlayingCard,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		const playingCard = await PlayingCard.findByIdAndUpdate(id, {
			...req.body.playingCard,
		});
		req.flash('success', 'New Playing Card was successfully updated!');
		res.redirect(`/playingcards/${id}`);
	})
);

// Delete playing card
router.delete(
	'/:id/delete',
	isAuthenticated,
	isCreator,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		await PlayingCard.findByIdAndDelete(id);
		req.flash('success', 'New Playing Card was successfully deleted!');
		res.redirect('/playingcards');
	})
);

module.exports = router;
