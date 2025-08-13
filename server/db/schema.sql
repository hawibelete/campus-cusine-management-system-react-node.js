CREATE DATABASE IF NOT EXISTS lounge_online_ordering_system;
USE lounge_online_ordering_system;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    f_name VARCHAR(255),
    l_name VARCHAR(255),
    email VARCHAR(255),
    username VARCHAR(255),
    password VARCHAR(255),
    image_url varchar(255) DEFAULT NULL,
    added_at DATE
);

CREATE TABLE lounges (
    lounge_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    location VARCHAR(255),
    description TEXT,
    added_at DATE,
    chapa_public_key VARCHAR(255),
    image_url varchar(500) DEFAULT NULL,
    provides_delivery tinyint(1) DEFAULT '0',
    provides_prepaid tinyint(1) NOT NULL DEFAULT '0'
);

CREATE TABLE lounge_staff (
    lounge_staff_id INT AUTO_INCREMENT PRIMARY KEY,
    lounge_id INT,
    password VARCHAR(255),
    added_at DATE,
    username VARCHAR(255),
    FOREIGN KEY (lounge_id) REFERENCES lounges(lounge_id)
);

CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    email VARCHAR(255),
    added_at DATE
);

CREATE TABLE menu_items (
    menu_item_id INT AUTO_INCREMENT PRIMARY KEY,
    lounge_id INT,
    name VARCHAR(255),
    price DECIMAL(10,2),
    description TEXT,
    availability BOOLEAN,
    added_at DATE,
    image_url varchar(255) DEFAULT NULL,
    FOREIGN KEY (lounge_id) REFERENCES lounges(lounge_id)
);

CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    menu_item_id INT,
    quantity INT,
    added_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
);

CREATE TABLE favorites (
    user_id INT,
    menu_item_id INT,
    added_at DATE,
    PRIMARY KEY (user_id, menu_item_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
);

CREATE TABLE feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    lounge_id INT,
    rating DECIMAL(2,1),
    comment TEXT,
    added_at DATE,
    responded tinyint(1) NOT NULL DEFAULT '0',
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (lounge_id) REFERENCES lounges(lounge_id)
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    lounge_id INT,
    total_price DECIMAL(10,2),
    status VARCHAR(255),
    added_at TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (lounge_id) REFERENCES lounges(lounge_id)
);

CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    menu_item_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (menu_item_id) REFERENCES menu_items(menu_item_id)
);

CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type VARCHAR(255),
    message TEXT,
    added_at TIMESTAMP,
    is_read tinyint(1) DEFAULT '0',
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE prepaid_services (
    prepaid_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    lounge_id INT,
    prepaid_amount DECIMAL(10,2),
    remaining_balance DECIMAL(10,2),
    added_at DATE,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (lounge_id) REFERENCES lounges(lounge_id)
);

CREATE TABLE prepaid_service_info (
    lounge_id INT PRIMARY KEY,
    discount_percentage DECIMAL(5,2),
    minimum_top_up DECIMAL(10,2),
    additional_info TEXT,
    FOREIGN KEY (lounge_id) REFERENCES lounges(lounge_id)
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    tx_ref VARCHAR(255),
    order_id INT,
    amount DECIMAL(10,2),
    status VARCHAR(255),
    added_at TIMESTAMP,
    prepaid_id INT,
    type VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (prepaid_id) REFERENCES prepaid_services(prepaid_id)
);
