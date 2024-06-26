const { Pool } = require('pg');

class Database {
    constructor() {
        this.database = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'livraria',
            password: 'password',
            port: '5432',
        });
    }
}

module.exports = Database;