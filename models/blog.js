const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const blogSchema = Schema({
    title: {
        type: String,
        required: true
    },
    snipet: {
        type: String,
        required: true
    },
    "blog-body": {
        type: String,
        required: true
    }
}, { timestamps: true});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;