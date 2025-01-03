-- src/database/migrations/create_stores_table.sql

CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  address VARCHAR(500),
  phone_number VARCHAR(20),
  email VARCHAR(100),
  website_url VARCHAR(255),
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  business_hours JSON,
  category VARCHAR(100),
  rating DECIMAL(3, 2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- インデックス追加
CREATE INDEX idx_stores_name ON stores(name);
CREATE INDEX idx_stores_category ON stores(category);
CREATE INDEX idx_stores_rating ON stores(rating);