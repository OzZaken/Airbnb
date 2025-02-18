const express = require('express')
const {requireAuth,requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser,getUsers,deleteUser,updateUser,getUsersByOrders} = require('./user.controller')

const router = express.Router()

router.get('/', getUsers)
router.get('/orders', getUsersByOrders)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', requireAuth, requireAdmin, deleteUser)

module.exports = router