const Database = require("../database/connection");

class ProductController extends Database {

    async cadastrar(request, response) {
        try {
            const dados = request.body;

            console.log(dados);

            const sql =
                "INSERT INTO products (name,amount,color,voltage, description, category_id) VALUES ($1, $2, $3, $4, $5, $6)";
            const values = [dados.name, dados.amount, dados.color, dados.voltage, dados.description, dados.category_id];

            if (!dados.name) {
                return response.status(400).json({ message: "O name é obrigatório" });
            }

            await this.database.query(sql, values);

            response.status(201).json({ message: "Cadastrado com sucesso!" });
        } catch {
            response.status(500).json({ message: "Erro ao cadastrar um novo product." })
        }
    }

    async listar(request, response) {
        const sql = "SELECT * FROM products";
        const products = await this.database.query(sql);
        response.status(200).json(products.rows);
    }
}

module.exports = ProductController;