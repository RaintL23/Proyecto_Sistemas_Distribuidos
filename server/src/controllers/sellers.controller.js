const sellerController = {}

const Seller = require('../models/sellers')

sellerController.getSellers = async (req, res) => {
    const sellers = await Seller.find()
    res.json(sellers)
}
sellerController.getSeller = async (req, res) => {
    const sellers = await Seller.findById(req.params.id)
    res.send(sellers)
}
sellerController.createSeller = async (req, res) => {
    const newSellers = new Seller(req.body)

    await newSellers.save()

    res.send({message: 'Seller Created'})
}
sellerController.editSeller = async (req, res) => {
    await Seller.findByIdAndUpdate(req.params.id, req.body)
    res.json({message: 'Seller Updated'})
}
sellerController.deleteSeller = async (req, res) => {
    await Seller.findByIdAndDelete(req.params.id)
    res.json({status: 'Seller Deleted'})
}

sellerController.countSellers = async (req, res) => {
    const sellersQuantity = await Seller.estimatedDocumentCount();
    res.json({sellerQuantity: sellersQuantity})
}

module.exports = sellerController