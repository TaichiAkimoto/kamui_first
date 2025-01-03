-- 初期店舗データ投入スクリプト

-- 店舗カテゴリの挿入
INSERT INTO store_categories (name, description) VALUES 
('レストラン', '様々な料理を提供するレストラン'),
('カフェ', 'コーヒーや軽食を楽しめるカフェ'),
('バー', '夜の雰囲気を楽しめる飲み場');

-- 店舗データの挿入
INSERT INTO stores (
    name, 
    category_id, 
    address, 
    phone_number, 
    email, 
    website, 
    description, 
    opening_hours, 
    latitude, 
    longitude, 
    rating
) VALUES 
(
    '東京グルメレストラン', 
    (SELECT id FROM store_categories WHERE name = 'レストラン'),
    '東京都渋谷区道玄坂1-2-3', 
    '03-1234-5678', 
    'info@tokyo-gourmet.jp', 
    'https://www.tokyo-gourmet.jp', 
    '地元の新鮮な食材を使用した創作料理を提供', 
    '11:30-22:00', 
    35.6585, 
    139.7454, 
    4.5
),
(
    'モダンカフェ', 
    (SELECT id FROM store_categories WHERE name = 'カフェ'),
    '東京都新宿区西新宿2-4-5', 
    '03-9876-5432', 
    'contact@modern-cafe.jp', 
    'https://www.modern-cafe.jp', 
    'アートな雰囲気の中で楽しむ本格コーヒー', 
    '08:00-21:00', 
    35.6892, 
    139.7026, 
    4.2
),
(
    'ナイトバー', 
    (SELECT id FROM store_categories WHERE name = 'バー'),
    '東京都港区六本木7-8-9', 
    '03-5555-1212', 
    'reservation@night-bar.jp', 
    'https://www.night-bar.jp', 
    '洗練されたカクテルと落ち着いた雰囲気', 
    '18:00-02:00', 
    35.6630, 
    139.7394, 
    4.7
);

-- メニューアイテムの挿入
INSERT INTO menu_items (
    store_id, 
    name, 
    description, 
    price, 
    category
) VALUES 
(
    (SELECT id FROM stores WHERE name = '東京グルメレストラン'),
    '特選和牛ステーキ', 
    '最高級の和牛を使用した特製ステーキ', 
    5000, 
    'メインディッシュ'
),
(
    (SELECT id FROM stores WHERE name = 'モダンカフェ'),
    'アーティザンコーヒー', 
    '厳選された豆を使用したスペシャルティコーヒー', 
    800, 
    'ドリンク'
),
(
    (SELECT id FROM stores WHERE name = 'ナイトバー'),
    'シグネチャーカクテル', 
    'バーテンダー特製のオリジナルカクテル', 
    1500, 
    'カクテル'
);