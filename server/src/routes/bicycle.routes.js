const { Router } = require('express')
const router = Router()

const bicyclesController = require('../controllers/bicycle.controller')

router.get('/api/bicycles', bicyclesController.getBicycles)
router.post('/api/bicycles', bicyclesController.createBicycle)
router.get('/api/bicycles/:id', bicyclesController.getBicycle)
router.put('/api/bicycles/:id', bicyclesController.editBicycle)
router.delete('/api/bicycles/:id', bicyclesController.deleteBicycle)

router.get('/api/bicyclescount', bicyclesController.countBicycles)

module.exports = router