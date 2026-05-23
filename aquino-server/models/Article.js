const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
    id: {
        type: Number,
        unique: true,
        sparse: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    paragraphs: {
        type: [String],
        required: true,
        default: []
    },
    preview: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['enabled', 'disabled'],
        default: 'enabled'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);