const Database = require("../database/connection");

class ClientsController extends Database {

    async cadastrar(request, response) {
        try {
            const dados = request.body;

            console.log(dados);

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
