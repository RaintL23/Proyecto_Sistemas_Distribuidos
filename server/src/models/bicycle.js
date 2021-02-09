const { Schema, model } = require('mongoose')

const bicycleSchema = new Schema({
    price: {type: Number, required: true},
    model: {type: String, required: true},
    brand: {type: String, required: true},
    type: {type: String, required: true},
    size: {type: String, required: true},
    material: {type: String, required: true},
    sellerId: {type: String, required: true},
}, {
    timestamps: true,
    versionKey: false
})

module.exports = model('Bicycle', bicycleSchema)