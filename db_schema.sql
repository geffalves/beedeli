-- Execute esses comandos no seu Console Neon/Postgres para configurar o banco de dados

-- 1. Tabela de Produtos
CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    stock INTEGER DEFAULT 0,
    image_url TEXT,
    available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Configurações (Horários)
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
);

-- 3. Dados Iniciais (Opcional)
INSERT INTO settings (key, value) VALUES 
('openingTime', '08:00'),
('closingTime', '18:00')
ON CONFLICT (key) DO NOTHING;

INSERT INTO products (id, name, description, stock, image_url, available) VALUES
('1', 'Uva com Chocolate Branco', 'Uva thompson envolta em brigadeiro de leite ninho e chocolate branco.', 25, 'https://i.postimg.cc/6qnDZgJq/Chat-GPT-Image-3-02-2026-17-19-04.png', true),
('2', 'Uva com Chocolate Ao Leite', 'A clássica. Uva verde fresca com ganache ao leite.', 12, 'https://i.postimg.cc/6qnDZgJq/Chat-GPT-Image-3-02-2026-17-19-04.png', true),
('3', 'Surpresa de Uva Crispy', 'Cobertura crocante de flocos de arroz e chocolate meio amargo.', 8, 'https://i.postimg.cc/6qnDZgJq/Chat-GPT-Image-3-02-2026-17-19-04.png', true)
ON CONFLICT (id) DO NOTHING;
