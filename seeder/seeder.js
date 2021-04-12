const mongoose = require('mongoose');
const PlayingCard = require('../models/playingCard');

// Mongoose Connecting to Mongo
mongoose
	.connect('mongodb://localhost:27017/playingCardCapstone', {
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Mongo Connection Open');
	})
	.catch((error) => handleError(error));

const sampleData = [
	{
		name: 'Tally Ho Playing Cards',
		description: 'A cool playing card with a circle back',
		image:
			'https://images.unsplash.com/photo-1501003878151-d3cb87799705?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
		price: '$',
		company: 'United States Playing Card Company',
		submittedBy: '606f4993bca7747f009a0e14',
	},
	{
		name: 'Bicycle Playing Cards',
		description: 'A cool playing card with a bicycle back',
		image:
			'https://images.unsplash.com/photo-1501003878151-d3cb87799705?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
		price: '$',
		company: 'United States Playing Card Company',
		submittedBy: '606f4993bca7747f009a0e14',
	},
	{
		name: 'Arco Playing Cards',
		description: 'A cool playing card with a hypnotic circle back',
		image:
			'https://images.unsplash.com/photo-1501003878151-d3cb87799705?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
		price: '$',
		company: 'United States Playing Card Company',
		submittedBy: '606f4993bca7747f009a0e14',
	},
	{
		name: 'Jerry Nugget Playing Cards',
		description: 'A very rare playing card set',
		image:
			'https://images.unsplash.com/photo-1501003878151-d3cb87799705?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
		price: '$',
		company: 'United States Playing Card Company',
		submittedBy: '606f4993bca7747f009a0e14',
	},
];

// We first clear our database and then add in our playing cards sample
const seedDB = async () => {
	await PlayingCard.deleteMany({});
	const res = await PlayingCard.insertMany(sampleData)
		.then((data) => console.log('Data inserted'))
		.catch((e) => console.log(e));
};

// We run our seeder function then close the database after.
seedDB().then(() => {
	mongoose.connection.close();
});
