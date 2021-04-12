const express = require('express');
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require('../joiSchemas');
const AppError = require('../utilities/AppError');
const asyncCatcher = require('../utilities/asyncCatcher');
const {
	validateReview,
	isAuthenticated,
	isReviewCreator,
} = require('../middleware/middleware');

const PlayingCard = require('../models/playingCard');
const Review = require('../models/review');

// CONFIG: Each route starts with: /playingcards/:id/reviews

// Create A New Review | EJS: SHOW
router.post(
	'/',
	isAuthenticated,
	validateReview,
	asyncCatcher(async (req, res) => {
		const { id } = req.params;
		const playingCard = await PlayingCard.findById(id);
		const review = new Review(req.body.review);
		review.author = req.user._id;
		playingCard.reviews.push(review);
		await playingCard.save();
		await review.save();
		req.flash('success', 'New Review was successfully added!');
		res.redirect(`/playingcards/${id}`);
	})
);

router.delete(
	'/:reviewId',
	isAuthenticated,
	isReviewCreator,
	asyncCatcher(async (req, res) => {
		const { id, reviewId } = req.params;
		await PlayingCard.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
		await Review.findByIdAndDelete(reviewId);
		req.flash('success', 'New Review was successfully deleted!');
		res.redirect(`/playingcards/${id}`);
	})
);

module.exports = router;
