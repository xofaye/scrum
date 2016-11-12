var mongoose = require('mongoose');
var url = 'mongodb://localhost/maindb';
var Schema = mongoose.Schema;

var eventSchema = new Schema(
    {
        title: {
            type: String, required: true
        },
        author: {
            type: String, required: true
        },
        timestamp: {
            type: String, required: true
        },
        location: {
            type: String, required: true
        },
        type: {
            type: String, required: true
        },
        description: {
            type: String
        },
        numberRequired: {
            type: Number, default: 0
        }
    },
    {
        collection: 'events'
    }
);

// Doc for Mongoose Connections: http://mongoosejs.com/docs/connections
mongoose.connect('mongodb://localhost/maindb');

// Doc for Mongoose Models: http://mongoosejs.com/docs/models
module.exports = mongoose.model('Event', bookSchema);