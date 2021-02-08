const { Router } = require('express')
const router = Router()

const bicyclesController = require('../controllers/bicycle.controller')

router.get('/api/bicycles', bicyclesController.getBicycles)
router.post('/api/bicycles', bicyclesController.createBicycles)
router.get('/api/bicycles/:id', bicyclesController.getBicycles)
router.put('/api/bicycles/:id', bicyclesController.editBicycles)
router.delete('/api/bicycles/:id', bicyclesController.deleteBicycles)

router.get('/api/bicyclescount', bicyclesController.countBicycles)

module.exports = router