const Database = require("../database/connection");

class OrderController extends Database {

    async cadastrar(request, response) {
        try {
            const order = request.body; 

            if (!order.client_id) {
                return response.status(400).json({ message: "O client_id é obrigatório" });
            }   

            if (!order.items) {
                return response.status(400).json({ message: "O items é obrigatório" });
            }

            if (!order.address) {
                return response.status(400).json({ message: "O address é obrigatório" });
            }

            if (!order.items[0].amount) {
                return response.status(400).json({ message: "O amount é obrigatório" });
            }

            if (!order.items[0].price) {
                return response.status(400).json({ message: "O price é obrigatório" });
            }

            if (!order.items[0].product_id) {
                return response.status(400).json({ message: "O product_id é obrigatório" });
            }
       
            let totalOrder = 0
            
            for (const item of order.items) {
                totalOrder += (item.price * item.amount) 
            }

            const sqlInsertOrder = "INSERT INTO orders (total, address, observations, client_id) VALUES ($1, $2, $3, $4) RETURNING id;";
            const valuesOrder = [totalOrder,order.address, order.observations, order.client_id];

            const orderResult = await this.database.query(sqlInsertOrder, valuesOrder);
            
            const orderId = orderResult.rows[0].id;
            
            for (const item of order.items) {
                const sqlInsertOrderItens = "INSERT INTO orders_items (amount, price, order_id, product_id) VALUES ($1, $2, $3, $4) RETURNING id;";
                const valuesOrderItens = [item.amount, item.price, orderId, item.product_id];
                
                await this.database.query(sqlInsertOrderItens, valuesOrderItens);
            }
            
            response.status(201).json({ message: "Cadastrado de uma nova order sucesso!" });

        } catch {
            response.status(500).json({ message: "Erro ao cadastrar um novo order." });
        }
    }
}

module.exports = OrderController;