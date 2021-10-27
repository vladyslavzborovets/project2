const mongoose = require('mongoose')

const journalSchema = new mongoose.Schema( {
    name: {type: String, required: true},
    description: {type: String, required: true},
    img: {type: String, required: true},
    touristAtractions: [{
        title: {type: String, required: true},
        img: {type: String, required: true},
        description: {type: String, required: true}
    }]

})

const Journal = mongoose.model('Journal', journalSchema);

module.exports = Journal
