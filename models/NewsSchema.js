const { Schema, model } = require("mongoose");

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');

const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');

const dateOnly = `${day}.${month}.${year}`;
const timeOnly = `${hours}:${minutes}`;

const NewsSchema = new Schema({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: dateOnly
    },
    time: {
        type: String,
        default: timeOnly
    }
});

const NewsModel = model('new', NewsSchema);

module.exports = { NewsModel };