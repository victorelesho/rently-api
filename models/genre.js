const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 50
    }
});

const Genre = mongoose.model("Genre", genreSchema);

//function to validate inputs using joi
function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });

    return schema.validate(genre);
}


exports.Genre = Genre;
exports.validate = validateGenre;
exports.genreSchema = genreSchema;