const { Schema, model } = require('mongoose')

const sellerSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    age: {type: Number, required: true},
    sex: {type: String, required: true},
    reputation: {type: String, required: true},
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Seller', sellerSchema)