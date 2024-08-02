# Stok Takip Sistemi

Bu proje, bir stok takip sistemi uygulamasıdır. Ürünleri ekleyebilir, silebilir, güncelleyebilir ve stok giriş/çıkış işlemlerini gerçekleştirebilirsiniz. Ayrıca, kategoriye göre ürün dağılımı ve boyutlara göre ürün dağılımını pasta grafikleri ile görselleştirebilirsiniz.

## Özellikler

- Ürün ekleme, silme ve güncelleme
- Stok giriş ve çıkış işlemleri
- Kategoriye göre ürün dağılımı grafiği
- Boyutlara göre ürün dağılımı grafiği
- Maliyet hesaplama ve güncelleme
- Mobil uyumlu arayüz

## Gereksinimler

- Node.js
- PostgreSQL

### Backend

1. Projeyi klonlayın:

    ```bash
    git clone https://github.com/Mustafazxcv/sts-stock.git
    cd sts-stock/backend
    ```

2. Gerekli paketleri yükleyin:

    ```bash
    npm install
    ```

3. `.env` dosyasını oluşturun ve PostgreSQL bağlantı bilgilerinizi girin:

    ```
    DATABASE_URL=postgres://username:password@localhost:5432/stoktakip
    ```

4. Veritabanı tablolarını oluşturun:

    ```sql
    CREATE TABLE admins (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    );

    CREATE TABLE categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) REFERENCES categories(name),
      size VARCHAR(50),
      price DECIMAL(10, 2) NOT NULL,
      quantity INT NOT NULL,
      description TEXT,
      image_url VARCHAR(255)
    );

    CREATE TABLE units (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL,
      price_per_unit DECIMAL(10, 2) NOT NULL
    );

    CREATE TABLE costs (
      id SERIAL PRIMARY KEY,
      unit_id INT REFERENCES units(id),
      quantity DECIMAL(10, 2) NOT NULL,
      total_cost DECIMAL(10, 2) NOT NULL
    );
    ```

5. Sunucuyu başlatın:

    ```bash
    npm start
    ```

### Frontend

1. Frontend dizinine gidin:

    ```bash
    cd ../frontend
    ```

2. Gerekli paketleri yükleyin:

    ```bash
    npm install
    ```

3. Uygulamayı başlatın:

    ```bash
    npm start
    ```

## Kullanım

- Ana sayfada ürünlerin kategori ve boyutlarına göre dağılımını görebilirsiniz.
- Ürünler sayfasında tüm ürünleri listeleyebilir ve detaylarını görebilirsiniz.
- Ürün ekleyebilir, silebilir ve güncelleyebilirsiniz.
- Stok giriş/çıkış işlemlerini gerçekleştirebilirsiniz.
- Maliyet hesaplama sayfasında birim fiyatlarını güncelleyebilir ve maliyet hesaplaması yapabilirsiniz.
