const mongoose = require('mongoose');
const Joi = require('joi');
const { genreSchema } = require('./genre');

const rentalSchema = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 3,
                maxlength: 50
            },
            isGold: {
                type: Boolean,
                default: false
            },
            phone: {
                type: String,
                required: true,
                minlength: 7,
                maxlength: 15
            }
        }),
        required: true
    },

    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true, 
                minlength: 3,
                maxlength: 255
            },
            dailyRentalRate: { 
                type: Number, 
                required: true,
                min: 0,
                max: 255
            } 
        }),
        required: true
    },

    dateOut: { 
        type: Date, 
        required: true,
        default: Date.now
    },

    dateReturned: { 
        type: Date
    },

    rentalFee: { 
        type: Number, 
        min: 0
    }   
});

const Rental = mongoose.model("Rental", rentalSchema);


//function to validate inputs using joi
function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });

    return schema.validate(rental);
};
 

exports.Rental = Rental;
exports.validate = validateRental;