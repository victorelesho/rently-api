const { Customer, validate } = require('../models/customer');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort({ name: 1 });
    res.send(customers);   
});

//process post request
router.post('/', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);
    
    const customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    await customer.save();

    res.send(customer);
});

//process put request
router.put('/:id', async (req, res) => {
    const result = validate(req.body);
    if (result.error) return res.status(400).send(result.error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(
        req.params.id, 
        { 
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone 
        }, 
        { new: true }
    );
    if(!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

//process delete request
router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);

    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

//process single get request
router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id); 

    if(!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

module.exports = router;



