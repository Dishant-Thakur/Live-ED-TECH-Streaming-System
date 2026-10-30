const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true
        },

        thumbnail: {
            type: String,
            required: true

        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        originalPrice: {
            type: Number,
            required: true,
            min: 0
        },

        isPublished: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);
module.exports = mongoose.model("Course", courseSchema);