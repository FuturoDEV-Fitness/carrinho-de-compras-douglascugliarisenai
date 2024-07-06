const Database = require("../database/connection");

class ProductController extends Database {

    async cadastrar(request, response) {
        try {
            const dados = request.body;

            const sql =
                "INSERT INTO products (name,amount,color,voltage, description, category_id) VALUES ($1, $2, $3, $4, $5, $6)";
            const values = [dados.name, dados.amount, dados.color, dados.voltage, dados.description, dados.category_id];

            if (!dados.name) {
                return response.status(400).json({ message: "O name é obrigatório" });
            }

            if (!dados.category_id) {
                return response.status(400).json({ message: "O category_id é obrigatório" });
            }

            await this.database.query(sql, values);

            response.status(201).json({ message: "Cadastrado com sucesso!" });
        } catch {
            response.status(500).json({ message: "Erro ao cadastrar um novo product." })
        }
    }

    async listar(request, response) {
        try {
            const sql = "SELECT * FROM products";
            const products = await this.database.query(sql);

            products.rows.length == 0 ? response.status(404).json({ message: "Nenhum produto encontrado." }) :
            response.status(200).json(products.rows);
        } catch {
            response.status(500).json({ message: "Erro ao buscar todos os produtos." })
        }
    }

    async listarUnico(request, response){
        try {
            const idProduto = request.params.id;
        
            const sql = "SELECT * FROM products p RIGHT JOIN categories c ON c.id = p.category_id WHERE p.id $1;";
            const result = await this.database.query(sql, [idProduto]);
    
            result.rows.length == 0 ? response.status(404).json({ message: "Nenhum produto encontrado." }) :
            response.status(200).json(result.rows);
        } catch {
            response.status(500).json({ message: "Erro ao buscar todos os produtos." })
        }
    }
}

module.exports = ProductController;