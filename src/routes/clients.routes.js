const { Router } = require('express');
const ClientController = require('../controllers/ClientController');
const clientsRoutes = new Router();
const clientController = new ClientController()

clientsRoutes.post("/", clientController.cadastrar.bind(clientController));


module.exports = clientsRoutes;