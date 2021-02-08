const bicycleController = {}

const Bicycle = require('../models/bicycle')

bicycleController.getBicycles = async (req, res) => {
    const bicycles = await Bicycle.find()
    res.json(bicycles)
}
bicycleController.getBicycle = async (req, res) => {
    const bicycle = await Bicycle.findById(req.params.id)
    res.send(bicycle)
}
bicycleController.createBicycle = async (req, res) => {
    const newBicycle = new Bicycle(req.body)

    await newBicycle.save()

    res.send({message: 'Bicycle Created'})
}
bicycleController.editBicycle = async (req, res) => {
    await Bicycle.findByIdAndUpdate(req.params.id, req.body)
    res.json({message: 'Bicycle Updated'})
}
bicycleController.deleteBicycle = async (req, res) => {
    await Bicycle.findByIdAndDelete(req.params.id)
    res.json({status: 'Bicycle Deleted'})
}

bicycleController.countBicycles = async (req, res) => {
    const bicyclesQuantity = await Bicycle.estimatedDocumentCount();
    res.json({bicycleQuantity: bicyclesQuantity})
}

module.exports = bicycleController