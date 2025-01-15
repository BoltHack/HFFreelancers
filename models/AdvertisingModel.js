const { Schema, model } = require("mongoose");

const advertisingSchema = new Schema({
    title: {
        type: String
    },
    image: {
        type: String
    },
    link: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresInMinutes: {
        type: Number,
        required: true
    },
    expiresAt: {
        type: Date
    },
    locale: {
        type: String
    }
});

advertisingSchema.pre('save', function(next) {
    if (this.expiresInMinutes) {
        this.expiresAt = new Date(Date.now() + this.expiresInMinutes * 60 * 1000);
    }
    next();
});

advertisingSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const AdvertisingModel = model('Advertising', advertisingSchema);

module.exports = { AdvertisingModel };