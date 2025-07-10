const {Schema, model} = require("mongoose");

const linksSchema = new Schema({
    vk: {
        type: String
    },
    discord: {
        type: String
    },
    instagram: {
        type: String
    },
    facebook: {
        type: String
    }
});

const LinksModel = model('links', linksSchema);


module.exports = {LinksModel}