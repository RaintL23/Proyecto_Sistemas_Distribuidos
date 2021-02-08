const { Router } = require('express')
const router = Router()

const sellersController = require('../controllers/sellers.controller')

router.get('/api/sellers', sellersController.getSellers)
router.post('/api/sellers', sellersController.createSeller)
router.get('/api/sellers/:id', sellersController.getSeller)
router.put('/api/sellers/:id', sellersController.editSeller)
router.delete('/api/sellers/:id', sellersController.deleteSeller)

router.get('/api/sellerscount', sellersController.countSellers)

module.exports = router