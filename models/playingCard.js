const mongoose = require('mongoose');
const Review = require('./review');
const Schema = mongoose.Schema;

const PlayingCardSchema = new Schema({
	name: String,
	image: String,
	price: String,
	description: String,
	company: String,
	submittedBy: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	reviews: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Review',
		},
	],
});

PlayingCardSchema.post('findOneAndDelete', async function (data) {
	if (data) {
		await Review.deleteMany({
			_id: {
				$in: data.reviews,
			},
		});
	}
});

module.exports = mongoose.model('PlayingCard', PlayingCardSchema);
