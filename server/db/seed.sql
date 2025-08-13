-- USERS
INSERT INTO users (user_id, f_name, l_name, email, username, password, added_at) VALUES
(1, 'Alice', 'Smith', 'alice@example.com', 'user1', '$2b$10$qG0HQ2C.7JZsMqgxZ7CsSuuZ5eLeU6lLKbg03s4PT3x7GimWJpKzC', '2025-03-24'),
(2, 'Bob', 'Brown', 'bob@example.com', 'user2', '$2b$10$FWMu8hO9IWlDMPsOE43NyeGj4hd43bit2gv8xo0OG7A.nTphJy/Y6', '2025-03-24'),
(3, 'Carol', 'Jones', 'carol@example.com', 'carolj', 'pass123', '2025-03-24'),
(4, 'David', 'Lee', 'david@example.com', 'davidl', 'pass123', '2025-03-24'),
(5, 'Eva', 'Green', 'eva@example.com', 'evag', 'pass123', '2025-03-24');

-- LOUNGES
INSERT INTO lounges (lounge_id, name, location, description, added_at, chapa_public_key) VALUES
(1, 'Lounge One', 'Addis Ababa', 'Trendy downtown spot.', '2025-03-24', 'pubkey1'),
(2, 'Chill Zone', 'Adama', 'Relaxed atmosphere.', '2025-03-24', 'pubkey2'),
(3, 'Cafe Lounge', 'Bahir Dar', 'Scenic lake view.', '2025-03-24', NULL),
(4, 'Urban Bites', 'Hawassa', 'Modern fusion menu.', '2025-03-24', NULL),
(5, 'Sky High', 'Gondar', 'Rooftop vibes.', '2025-03-24', 'pubkey5');

-- LOUNGE STAFF
INSERT INTO lounge_staff (lounge_staff_id, lounge_id, password, added_at, username) VALUES
(1, 1, '$2b$10$5OaDnvAyluxabfQYkOg0wuXZQYNUZRejU6rVpxXburiSKWpieDZFS', '2025-03-24', 'staff1'),
(2, 2, 'pass123', '2025-03-24', 'staff2'),
(3, 3, 'pass123', '2025-03-24', 'staff3'),
(4, 4, 'pass123', '2025-03-24', 'staff4'),
(5, 5, 'pass123', '2025-03-24', 'staff5');

-- ADMIN
INSERT INTO admin (admin_id, username, password, email, added_at) VALUES
(1, 'admin1', '$2b$10$Ig3csQGwQmQJUw8s9/OWheSHS/qmuHUKeIHhLAazbWF9SsU/LFIaS', 'admin1@example.com', '2025-03-24');

-- MENU ITEMS
INSERT INTO menu_items (menu_item_id, lounge_id, name, price, description, availability, added_at) VALUES
(1, 1, 'Burger', 12.50, 'Beef burger with fries', 1, '2025-03-24'),
(2, 1, 'Pizza', 15.00, 'Cheese pizza', 1, '2025-03-24'),
(3, 2, 'Pasta', 10.00, 'Creamy Alfredo', 1, '2025-03-24'),
(4, 3, 'Salad', 8.00, 'Fresh greens', 1, '2025-03-24'),
(5, 4, 'Coffee', 3.50, 'Espresso shot', 1, '2025-03-24');

-- CART ITEMS
INSERT INTO cart_items (cart_item_id, user_id, menu_item_id, quantity, added_at) VALUES
(1, 1, 1, 2, CURRENT_TIMESTAMP),
(2, 2, 2, 1, CURRENT_TIMESTAMP),
(3, 1, 3, 3, CURRENT_TIMESTAMP),
(4, 3, 4, 1, CURRENT_TIMESTAMP),
(5, 4, 5, 2, CURRENT_TIMESTAMP);

-- FAVORITES
INSERT INTO favorites (user_id, menu_item_id, added_at) VALUES
(1, 1, '2025-03-24'),
(1, 2, '2025-03-24'),
(2, 3, '2025-03-24'),
(3, 4, '2025-03-24'),
(4, 5, '2025-03-24');

-- FEEDBACK
INSERT INTO feedback (feedback_id, user_id, lounge_id, rating, comment, added_at) VALUES
(1, 1, 1, 4.5, 'Great service!', '2025-03-24'),
(2, 2, 2, 4.0, 'Nice vibe.', '2025-03-24'),
(3, 3, 3, 3.5, 'Good food.', '2025-03-24'),
(4, 4, 4, 5.0, 'Perfect!', '2025-03-24'),
(5, 5, 5, 4.2, 'Will come again.', '2025-03-24');

-- ORDERS
INSERT INTO orders (order_id, user_id, lounge_id, total_price, status, added_at) VALUES
(1, 1, 1, 25.00, 'pending', CURRENT_TIMESTAMP),
(2, 2, 2, 15.00, 'processing', CURRENT_TIMESTAMP),
(3, 3, 3, 10.00, 'completed', CURRENT_TIMESTAMP),
(4, 4, 4, 12.50, 'completed', CURRENT_TIMESTAMP),
(5, 5, 5, 8.00, 'pending', CURRENT_TIMESTAMP);

-- ORDER ITEMS
INSERT INTO order_items (order_item_id, order_id, menu_item_id, quantity, price) VALUES
(1, 1, 1, 2, 25.00),
(2, 2, 3, 1, 15.00),
(3, 3, 4, 1, 10.00),
(4, 4, 5, 2, 7.50),
(5, 5, 2, 1, 8.00);

-- NOTIFICATIONS
INSERT INTO notifications (notification_id, user_id, type, message, added_at) VALUES
(1, 1, 'order_info', 'Your order is ready.', CURRENT_TIMESTAMP),
(2, 2, 'info', 'Promo available now.', CURRENT_TIMESTAMP),
(3, 3, 'new_order', 'New order received.', CURRENT_TIMESTAMP),
(4, 4, 'info', 'Updated lounge hours.', CURRENT_TIMESTAMP),
(5, 5, 'order_info', 'Order #5 is completed.', CURRENT_TIMESTAMP);

-- PREPAID SERVICES
INSERT INTO prepaid_services (prepaid_id, user_id, lounge_id, prepaid_amount, remaining_balance, added_at) VALUES
(1, 1, 1, 100.00, 80.00, '2025-03-24'),
(2, 2, 2, 50.00, 50.00, '2025-03-24'),
(3, 3, 3, 30.00, 25.00, '2025-03-24'),
(4, 4, 4, 60.00, 60.00, '2025-03-24'),
(5, 5, 5, 120.00, 100.00, '2025-03-24');

-- PREPAID SERVICE INFO
INSERT INTO prepaid_service_info (lounge_id, discount_percentage, minimum_top_up, additional_info) VALUES
(1, 10.00, 50.00, 'Free coffee on top-ups over 100'),
(2, 5.00, 30.00, 'Limited time offer'),
(3, 0.00, 0.00, NULL),
(4, 7.50, 20.00, 'Student discount available'),
(5, 12.00, 75.00, 'Gold member exclusive');

-- PAYMENTS
INSERT INTO payments (payment_id, tx_ref, order_id, amount, status, added_at, prepaid_id, type) VALUES
(1, 'TX1001', 1, 25.00, 'completed', CURRENT_TIMESTAMP, NULL, 'payment'),
(2, 'TX1002', 2, 15.00, 'completed', CURRENT_TIMESTAMP, NULL, 'payment'),
(3, 'TX1003', 3, 10.00, 'completed', CURRENT_TIMESTAMP, NULL, 'payment'),
(4, 'TX1004', 4, 12.50, 'pending', CURRENT_TIMESTAMP, NULL, 'payment'),
(5, 'TX1005', 5, 8.00, 'completed', CURRENT_TIMESTAMP, 1, 'deposit');
