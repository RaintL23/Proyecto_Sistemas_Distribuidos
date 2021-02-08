const { Router } = require('express')
const router = Router()

const clientsController = require('../controllers/clients.controller')

router.get('/api/clients', clientsController.getClients)
router.post('/api/clients', clientsController.createClient)
router.get('/api/clients/:id', clientsController.getClient)
router.put('/api/clients/:id', clientsController.editClient)
router.delete('/api/clients/:id', clientsController.deleteClient)

router.get('/api/clientscount', clientsController.countClients)


module.exports = router