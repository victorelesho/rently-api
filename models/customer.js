const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
    },

    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },

    phone: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 15
    }  
});

const Customer = mongoose.model("Customer", customerSchema);


//function to validate inputs using joi
function validateCustomer(customer) {
    const schema = Joi.object({
        isGold: Joi.boolean(),
        name: Joi.string().min(3).max(50).required(),
        phone: Joi.string().min(7).max(15).required()
    });

    return schema.validate(customer);
};
 

exports.Customer = Customer;
exports.validate = validateCustomer;