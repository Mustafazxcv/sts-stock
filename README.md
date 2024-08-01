# Depo Kontrolü

Depo Kontrolü, ürünleri yönetmek ve analiz etmek için geliştirilmiş bir web uygulamasıdır. Bu uygulama, ürün ekleme, ürün listeleme, analiz raporları oluşturma ve kategori yönetimi gibi işlevleri destekler.

## Özellikler

- Ürün ekleme, güncelleme ve silme
- Ürünlerin kategorilere göre yönetimi
- Ürünlerin boyutlarına göre analiz
- Kategori bazlı analiz ve raporlama
- Ürünler için görsel yükleme

## Kurulum

### Gereksinimler

- Node.js (v18.0.0 veya üstü)
- PostgreSQL (veritabanı yönetim sistemi)



## Ürünler tablosu
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    size VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    category_id INT REFERENCES categories(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kategoriler tablosu
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Yöneticiler tablosu
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analitikler tablosu (Opsiyonel, ihtiyaca göre eklenebilir)
-- Bu tablo, ürünlerle ilgili analitik verileri saklayabilir.
CREATE TABLE product_analytics (
    id SERIAL PRIMARY KEY,
    total_products INT,
    category_counts JSONB,
    size_counts JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
