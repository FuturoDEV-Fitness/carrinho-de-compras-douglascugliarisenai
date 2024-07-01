-- Criação da tabela categories
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name_categoria VARCHAR(150) NOT NULL
);

-- Inserção de 10 categorias
INSERT INTO categories (name_categoria) VALUES
('Eletrônicos'),
('Roupas'),
('Alimentos'),
('Móveis'),
('Brinquedos'),
('Livros'),
('Ferramentas'),
('Beleza'),
('Esportes'),
('Automotivo');