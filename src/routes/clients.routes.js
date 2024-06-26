const { Router } = require('express');
const ClientsController = require('../controllers/ClientsController');
const clientsRoutes = new Router();
const clientsController = new ClientsController()

clientsRoutes.post("/", clientsController.cadastrar.bind(clientsController));


module.exports = clientsRoutes;