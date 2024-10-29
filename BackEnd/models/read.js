const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment-timezone');

const readSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    shortAnswer: { type: String, required: true },
    detailedAnswer: { type: String, required: true },
    authorId: { type: String, required: true },
    createdAt: { 
        type: String, 
        default: () => moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss") 
    },
    updatedAt: { 
        type: String, 
        default: () => moment.tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss") 
    }
});

module.exports = mongoose.model('Post', readSchema);