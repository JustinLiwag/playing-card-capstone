const Joi = require('joi');

module.exports.playingCardSchema = Joi.object({
	playingCard: Joi.object({
		name: Joi.string().required(),
		image: Joi.string().required(),
		price: Joi.string().required(),
		description: Joi.string().required(),
		company: Joi.string().required(),
	}),
});

module.exports.reviewSchema = Joi.object({
	review: Joi.object({
		body: Joi.string().required(),
		rating: Joi.number().required().min(1).max(5),
	}).required(),
});
