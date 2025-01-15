const {Schema, model} = require("mongoose");
const currentDate = new Date();

const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');

const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');


const dateOnly = `${day}.${month}.${year}`;
const timeOnly = `${hours}:${minutes}`;

const CommentsModel = new Schema({
    author: {
        type: String,
    },
    avatar: {
        type: String,
    },
    message: {
        type: String,
    },
    date: {
        type: Object,
        default: {
            year: currentDate.getFullYear(),
            month: (currentDate.getMonth() + 1).toString().padStart(2, '0'),
            day: currentDate.getDate().toString().padStart(2, '0')
        }
    },
    time: {
        type: String,
        default: timeOnly
    }
})

const WebsiteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    fileImg: {
        type: String,
        required: true
    },
    fileUpload: {
        type: String,
        required: true
    },
    siteType: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    saves: {
        type: Number,
        default: 0
    },
    commentsNumber: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    date: {
        type: String,
        default: dateOnly
    },
    comments: {
        type: [CommentsModel],
        default: [],
    }
});

const WebsitesModel = model('website', WebsiteSchema);

module.exports = {WebsitesModel}