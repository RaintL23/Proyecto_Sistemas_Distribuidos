const clientController = {}

const Client = require('../models/clients')

clientController.getClients = async (req, res) => {
    const clients = await Client.find()
    res.json(clients)
}
clientController.getClient = async (req, res) => {
    const client = await Client.findById(req.params.id)
    res.send(client)
}
clientController.createClient = async (req, res) => {
    const newClient = new Client(req.body)

    await newClient.save()

    res.send({message: 'Client Created'})
}
clientController.editClient = async (req, res) => {
    await Client.findByIdAndUpdate(req.params.id, req.body)
    res.json({message: 'Client Updated'})
}
clientController.deleteClient = async (req, res) => {
    await Client.findByIdAndDelete(req.params.id)
    res.json({status: 'Client Deleted'})
}

clientController.countClients = async (req, res) => {
    const clientsQuantity = await Client.estimatedDocumentCount();
    res.json({clientQuantity: clientsQuantity})
}

module.exports = clientController