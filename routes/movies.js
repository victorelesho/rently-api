const { Genre } = require('../models/genre');
const { Movie, validate } = require('../models/movie');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const movies = await Movie.find().sort({ name: 1 });
    res.send(movies);   
});

//process post request
router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre.');
    
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.numberInStock
    });
    await movie.save();

    res.send(movie);
});

//process put request
router.put('/:id', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Invalid genre.');

    const movie = await Movie.findByIdAndUpdate(
        req.params.id, 
        { 
            title: req.body.title,
            genre: {
                _id: genre._id,
                name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.numberInStock
        }, 
        { new: true }
    );
    if(!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

//process delete request
router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);

    if (!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

//process single get request
router.get('/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id); 

    if(!movie) return res.status(404).send('The movie with the given ID was not found.');

    res.send(movie);
});

module.exports = router;



