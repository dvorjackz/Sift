const mongoose = require('mongoose');

const schema = mongoose.Schema;

const rusheeSchema = new schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    resume: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestampes: true
});

const Rushee = mongoose.model('Rushee', rusheeSchema);

module.exports = Rushee;