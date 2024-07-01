const { Router } = require('express');
const OrderController = require('../controllers/OrderController');

const ordersRoutes = new Router();
const orderController = new OrderController()

ordersRoutes.post("/", orderController.cadastrar.bind(orderController));


module.exports = ordersRoutes;