-- Enum voltagem
CREATE TYPE voltage AS ENUM('110', '220');

-- Criação da tabela products
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    amount VARCHAR(150) DEFAULT '0',
    color VARCHAR(50),
    voltage VOLTAGE,
    description TEXT,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
