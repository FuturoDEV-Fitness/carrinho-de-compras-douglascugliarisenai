const Database = require("../database/connection");

class ClientsController extends Database {

    async cadastrar(request, response) {
        try {
            const dados = request.body;

            if (!dados.name) {
                return response.status(400).json({ message: "O name é obrigatório" });
            }

            if (!dados.email) {
                return response.status(400).json({ message: "O email é obrigatório" });
            }

            if (!dados.cpf) {
                return response.status(400).json({ message: "O cpf é obrigatório" });
            }

            if (!dados.contact) {
                return response.status(400).json({ message: "O contact é obrigatório" });
            }

            const sqlConsulta = "SELECT * FROM clients WHERE email = $1";
            const result = await this.database.query(sqlConsulta, [dados.email]);
            
            if (result.rows.length > 0) {
                return response.status(400).json({ message: "Email ja existe" });
            } 

            const sql =
                "INSERT INTO clients (name,email,cpf,contact) VALUES ($1, $2, $3, $4)";
            const values = [dados.name, dados.email, dados.cpf, dados.contact];

            if (!dados.name) {
                return response.status(400).json({ message: "O name é obrigatório" });
            }

            await this.database.query(sql, values);

            response.status(201).json({ message: "Cadastrado com sucesso!" });
        } catch {
            response.status(500).json({ message: "Erro ao cadastrar um novo clients." })
        }
    }
}

module.exports = ClientsController;
