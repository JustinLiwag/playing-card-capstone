const AppError = require('../utilities/AppError');

const PlayingCard = require('../models/playingCard');
const Review = require('../models/review');

const { playingCardSchema, reviewSchema } = require('../joiSchemas');

module.exports.isReviewCreator = async (req, res, next) => {
	const { id, reviewId } = req.params;
	const review = await Review.findById(reviewId);
	if (!review.author.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/playingcards/${id}`);
	}
	next();
};

module.exports.isAuthenticated = (req, res, next) => {
	if (!req.isAuthenticated()) {
		req.flash('error', 'You must be signed in to do that');
		return res.redirect('/login');
	}
	next();
};

module.exports.isCreator = async (req, res, next) => {
	const { id } = req.params;
	const playingCard = await PlayingCard.findById(id);
	if (!playingCard.submittedBy.equals(req.user._id)) {
		req.flash('error', 'You are not authorized to do that');
		return res.redirect(`/playingcards/${id}`);
	}
	next();
};

module.exports.validatePlayingCard = (req, res, next) => {
	const { error } = playingCardSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};

module.exports.validateReview = (req, res, next) => {
	const { error } = reviewSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((e) => e.message).join(',');
		throw new AppError(msg, 400);
	} else {
		next();
	}
};
