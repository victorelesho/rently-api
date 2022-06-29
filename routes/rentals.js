const { Customer } = require('../models/customer');
const { Movie } = require('../models/movie');
const { Rental, validate } = require('../models/rental');
const Fawn = require('fawn');
const express = require('express');
const router = express.Router();
const config = require('config');

Fawn.init(config.get('db'));

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort({ dateOut: -1 });
    res.send(rentals);   
});

//process post request
router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Invalid customer.');

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('Invalid movie.');

    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
    
    let rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name, 
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, { $inc: { numberInStock: -1 } })
            .run();

        res.send(rental);     
    } 
    catch (ex) {
        res.status(500).send('Something failed.');
    }
});


//process single get request
router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id); 

    if(!rental) return res.status(404).send('The rental with the given ID was not found.');

    res.send(rental);
});

module.exports = router;



