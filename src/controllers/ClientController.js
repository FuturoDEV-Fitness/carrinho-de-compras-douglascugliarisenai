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

            const sqlConsulta = "SELECT * FROM clients";
            const result = await this.database.query(sqlConsulta);

            for (let i = 0; i < result.rows.length; i++) {
                if(result.rows[i].email === dados.email) {
                    return response.status(400).json({ message: "Email ja existe" });
                }
                
                if(result.rows[i].cpf === dados.cpf) {
                    return response.status(400).json({ message: "Cpf ja existe" });
                }
            }

            const sql =
                "INSERT INTO clients (name,email,cpf,contact) VALUES ($1, $2, $3, $4)";
            const values = [dados.name, dados.email, dados.cpf, dados.contact];

            await this.database.query(sql, values);

            response.status(201).json({ message: "Cadastrado com sucesso!" });
        } catch {
            response.status(500).json({ message: "Erro ao cadastrar um novo clients." })
        }
    }
}

module.exports = ClientsController;
