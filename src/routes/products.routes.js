const { Router } = require('express');
const ProductController = require('../controllers/ProductController');

const productsRoutes = new Router();
const productController = new ProductController()

productsRoutes.post("/", productController.cadastrar.bind(productController));
productsRoutes.get("/", productController.listar.bind(productController));
productsRoutes.get("/:id", productController.listarUnico.bind(productController));


module.exports = productsRoutes;