const { Router } = require('express')
const router = Router()

const sellersController = require('../controllers/sellers.controller')

router.get('/api/sellers', sellersController.getSellers)
router.post('/api/sellers', sellersController.createSellers)
router.get('/api/sellers/:id', sellersController.getSellers)
router.put('/api/sellers/:id', sellersController.editSellers)
router.delete('/api/sellers/:id', sellersController.deleteSellers)

router.get('/api/sellerscount', sellersController.countClients)

module.exports = router