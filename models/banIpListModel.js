const { Schema, model } = require("mongoose");

const AuthorSchema = new Schema({
    authorName: {type: String, default: ''},
    authorId: {type: String, default: ''}
})

const banIpListSchema = new Schema({
    ip: {
        type: String
    },
    reason: {
        type: String
    },
    description: {
        type: String
    },
    author: [AuthorSchema],
});

const BanIpListModel = model('BanIpList', banIpListSchema);

module.exports = { BanIpListModel };