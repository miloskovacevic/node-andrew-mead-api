let mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        required: true,
        trim: true,
        type: String,
        minlength: 3
    }
});

module.exports = { User };
