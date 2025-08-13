INSERT INTO users (f_name, l_name, email, username, password, image_url, added_at) VALUES
('Abebe', 'Kebede', 'abebe.k@example.com', 'user1', '$2b$10$qG0HQ2C.7JZsMqgxZ7CsSuuZ5eLeU6lLKbg03s4PT3x7GimWJpKzC', 'https://example.com/abekeb.jpg', '2024-01-10'),
('Fikirte', 'Desta', 'fikirte.d@example.com', 'fikird', 'securepass', 'https://example.com/fikird.jpg', '2024-02-15'),
('Solomon', 'Tadesse', 'solomon.t@example.com', 'solot', 'mypassword', 'https://example.com/solot.jpg', '2024-03-20'),
('Sara', 'Lemma', 'sara.l@example.com', 'saral', 'mypassword', 'https://example.com/saral.jpg', '2024-04-01'),
('Dawit', 'Wolde', 'dawit.w@example.com', 'dawitw', 'passwordabc', 'https://example.com/dawitw.jpg', '2024-05-05'),
('Meseret', 'Girma', 'meseret.g@example.com', 'meserg', 'meseretp', 'https://example.com/meserg.jpg', '2024-06-10'),
('Tigist', 'Mamo', 'tigist.m@example.com', 'tigistm', 'tigistpw', 'https://example.com/tigistm.jpg', '2024-07-01'),
('Yonas', 'Bekele', 'yonas.b@example.com', 'yonasb', 'yonaspass', 'https://example.com/yonasb.jpg', '2024-08-12'),
('Aster', 'Tesfaye', 'aster.t@example.com', 'astert', 'asterpw', 'https://example.com/astert.jpg', '2024-09-03'),
('Kalab', 'Alemu', 'kalab.a@example.com', 'kalaba', 'kalabpass', 'https://example.com/kalaba.jpg', '2024-10-18'),
('Semira', 'Mohammed', 'semira.m@example.com', 'semiram', 'semirapw', 'https://example.com/semiram.jpg', '2024-11-22'),
('Biruk', 'Zewde', 'biruk.z@example.com', 'birukz', 'birukpass', 'https://example.com/birukz.jpg', '2024-12-01');

INSERT INTO lounges (name, location, description, added_at, chapa_public_key, image_url, provides_delivery, provides_prepaid) VALUES
('Lucy Restaurant', 'Addis Ababa', 'Experience traditional Ethiopian cuisine.', '2023-01-01', 'CHAPAPUBKEY123', 'https://example.com/lucy.jpg', 1, 1),
('Abyssinia Lounge', 'Adama', 'Modern lounge with a touch of Ethiopian culture.', '2023-02-01', 'CHAPAPUBKEY456', 'https://example.com/abyssinia.jpg', 1, 0),
('Enjera House', 'Gondar', 'Authentic Ethiopian food in a cozy setting.', '2023-03-01', 'CHAPAPUBKEY789', 'https://example.com/enjera.jpg', 0, 1);

INSERT INTO lounge_staff (lounge_id, password, added_at, username) VALUES
(1, '$2b$10$5OaDnvAyluxabfQYkOg0wuXZQYNUZRejU6rVpxXburiSKWpieDZFS', '2023-01-05', 'staff1'),
(2, 'abysstaffpass', '2023-02-10', 'abysstaff1'),
(3, 'enjerastaffpass', '2023-03-05', 'enjerastaff1');

INSERT INTO admin (username, password, email, added_at) VALUES
('admin1', '$2b$10$Ig3csQGwQmQJUw8s9/OWheSHS/qmuHUKeIHhLAazbWF9SsU/LFIaS', 'admin@example.com', '2022-12-01');

INSERT INTO menu_items (lounge_id, name, price, description, availability, added_at, image_url) VALUES
(1, 'Doro Wat', 250.00, 'Spicy chicken stew with injera.', TRUE, '2023-01-15', 'https://example.com/doro_wat.jpg'),
(1, 'Shiro Wat', 180.00, 'Chickpea powder stew.', TRUE, '2023-01-15', 'https://example.com/shiro_wat.jpg'),
(1, 'Atkilt Beyaynetu', 200.00, 'Mixed vegetable platter.', TRUE, '2023-01-16', 'https://example.com/atkilt.jpg'),
(1, 'Misir Wot', 190.00, 'Spicy red lentil stew.', TRUE, '2023-01-17', 'https://example.com/misir.jpg'),
(2, 'Tibs', 300.00, 'Sautéed beef or lamb.', TRUE, '2023-02-10', 'https://example.com/tibs.jpg'),
(2, 'Kitfo', 350.00, 'Minced raw beef, spiced with mitmita and niter kibbeh.', TRUE, '2023-02-10', 'https://example.com/kitfo.jpg'),
(2, 'Gomen Besiga', 280.00, 'Collard greens with beef.', TRUE, '2023-02-11', 'https://example.com/gomen_besiga.jpg'),
(2, 'Qwanta Firfir', 260.00, 'Dried meat stew with injera.', TRUE, '2023-02-12', 'https://example.com/qwanta_firfir.jpg'),
(3, 'Fasting Beyaynetu', 220.00, 'Assortment of vegan dishes.', TRUE, '2023-03-08', 'https://example.com/fasting_beyaynetu.jpg'),
(3, 'Dulet', 280.00, 'Minced tripe and liver, seasoned with spices.', TRUE, '2023-03-08', 'https://example.com/dulet.jpg'),
(3, 'Goden Tibs', 320.00, 'Ribs fried with onions and peppers.', TRUE, '2023-03-09', 'https://example.com/goden_tibs.jpg'),
(3, 'Chechebsa', 150.00, 'Flatbread with butter and spices.', TRUE, '2023-03-10', 'https://example.com/chechebsa.jpg');

INSERT INTO cart_items (user_id, menu_item_id, quantity, added_at) VALUES
(1, 1, 1, '2025-05-29 10:00:00'),
(2, 5, 2, '2025-05-29 11:30:00'),
(1, 2, 1, '2025-05-29 14:00:00'),
(3, 9, 1, '2025-05-29 15:00:00'),
(4, 6, 1, '2025-05-29 16:30:00'),
(5, 3, 2, '2025-05-29 17:00:00'),
(6, 7, 1, '2025-05-29 18:00:00'),
(7, 10, 1, '2025-05-29 19:30:00'),
(8, 4, 1, '2025-05-29 20:00:00'),
(9, 8, 2, '2025-05-29 21:00:00'),
(10, 11, 1, '2025-05-29 22:00:00');

INSERT INTO favorites (user_id, menu_item_id, added_at) VALUES
(1, 1, '2024-03-01'),
(2, 5, '2024-04-10'),
(3, 9, '2024-05-20'),
(4, 6, '2024-06-01'),
(5, 3, '2024-07-15'),
(6, 7, '2024-08-01'),
(7, 10, '2024-09-10'),
(8, 4, '2024-10-05'),
(9, 8, '2024-11-20'),
(10, 11, '2024-12-01'),
(1, 12, '2025-01-05');

INSERT INTO feedback (user_id, lounge_id, rating, comment, added_at, responded) VALUES
(1, 1, 4.5, 'Excellent Doro Wat!', '2024-04-05', 0),
(2, 2, 5.0, 'Tibs was amazing!', '2024-05-12', 0),
(3, 3, 3.0, 'Good food, but service was a bit slow.', '2024-05-20', 0),
(4, 2, 4.0, 'Kitfo was fresh and delicious.', '2024-06-02', 1),
(5, 1, 4.8, 'Loved the Atkilt Beyaynetu, very authentic.', '2024-07-18', 0),
(6, 3, 4.2, 'Fasting Beyaynetu was a great option.', '2024-08-05', 0),
(7, 1, 3.5, 'Shiro Wat was good, but a bit too spicy for me.', '2024-09-12', 0),
(8, 2, 4.7, 'Gomen Besiga was well prepared.', '2024-10-10', 1),
(9, 3, 5.0, 'Dulet was perfectly spiced!', '2024-11-25', 0),
(10, 1, 4.0, 'Misir Wot was hearty and flavorful.', '2024-12-05', 0),
(11, 2, 3.8, 'Qwanta Firfir was interesting, good experience.', '2025-01-02', 0);

INSERT INTO orders (user_id, lounge_id, total_price, status, added_at) VALUES
(1, 1, 250.00, 'Completed', '2025-05-29 10:30:00'),
(2, 2, 600.00, 'Pending', '2025-05-29 11:45:00'),
(3, 3, 220.00, 'Completed', '2025-05-29 15:10:00'),
(4, 2, 350.00, 'Completed', '2025-05-29 16:40:00'),
(5, 1, 400.00, 'Processing', '2025-05-29 17:15:00'),
(6, 3, 280.00, 'Completed', '2025-05-29 18:05:00'),
(7, 1, 190.00, 'Pending', '2025-05-29 19:40:00'),
(8, 2, 280.00, 'Completed', '2025-05-29 20:10:00'),
(9, 3, 640.00, 'Completed', '2025-05-29 21:15:00'),
(10, 1, 180.00, 'Cancelled', '2025-05-29 22:05:00'),
(11, 2, 260.00, 'Processing', '2025-05-30 09:00:00'),
(1, 1, 180.00, 'Completed', '2025-05-29 14:15:00');

INSERT INTO order_items (order_id, menu_item_id, quantity, price) VALUES
(1, 1, 1, 250.00),
(2, 5, 2, 300.00),
(3, 9, 1, 220.00),
(4, 6, 1, 350.00),
(5, 3, 2, 200.00),
(6, 10, 1, 280.00),
(7, 4, 1, 190.00),
(8, 7, 1, 280.00),
(9, 11, 2, 320.00),
(10, 2, 1, 180.00),
(11, 8, 1, 260.00),
(12, 2, 1, 180.00);

INSERT INTO notifications (user_id, type, message, added_at, is_read) VALUES
(1, 'Order Update', 'Your order #1 is now completed.', '2025-05-29 10:35:00', 0),
(2, 'New Offer', 'Check out our new menu items at Abyssinia Lounge!', '2025-05-29 12:00:00', 0),
(3, 'Order Update', 'Your order #3 is on its way!', '2025-05-29 15:15:00', 0),
(4, 'Feedback Request', 'We value your feedback on your recent order from Abyssinia Lounge.', '2025-05-29 16:50:00', 0),
(5, 'Order Update', 'Your order #5 has been confirmed.', '2025-05-29 17:20:00', 0),
(6, 'Prepaid Service', 'Your prepaid balance at Enjera House has been updated.', '2025-05-29 18:10:00', 0),
(7, 'Promotional', 'Exclusive discount for Lucy Restaurant customers!', '2025-05-29 20:00:00', 0),
(8, 'Order Update', 'Your order #8 has been delivered.', '2025-05-29 20:15:00', 0),
(9, 'Favorite Item', 'Your favorite item, Goden Tibs, is on special!', '2025-05-29 21:30:00', 0),
(10, 'Account Alert', 'Suspicious activity detected on your account.', '2025-05-29 22:10:00', 1),
(11, 'Order Update', 'Your order #11 is being prepared.', '2025-05-30 09:05:00', 0);

INSERT INTO prepaid_services (user_id, lounge_id, prepaid_amount, remaining_balance, added_at) VALUES
(1, 1, 1000.00, 750.00, '2024-01-20'),
(3, 3, 500.00, 500.00, '2024-04-15'),
(5, 1, 800.00, 800.00, '2024-06-01'),
(9, 3, 1200.00, 1200.00, '2024-08-10'),
(1, 1, 200.00, 200.00, '2025-01-10'),
(3, 3, 300.00, 300.00, '2025-02-01'),
(1, 1, 500.00, 500.00, '2025-03-05'),
(3, 3, 700.00, 700.00, '2025-04-12'),
(5, 1, 400.00, 400.00, '2025-05-20'),
(9, 3, 900.00, 900.00, '2025-05-25');

INSERT INTO prepaid_service_info (lounge_id, discount_percentage, minimum_top_up, additional_info) VALUES
(1, 10.00, 500.00, 'Get 10% off on all orders when using prepaid service.'),
(3, 5.00, 300.00, 'Enjoy a 5% discount on your favorite vegan dishes.');

INSERT INTO payments (tx_ref, order_id, amount, status, added_at, prepaid_id, type) VALUES
('chapa_tx_ref_12345', 1, 250.00, 'Successful', '2025-05-29 10:30:15', NULL, 'Order'),
('chapa_tx_ref_67890', NULL, 1000.00, 'Successful', '2024-01-20 09:00:00', 1, 'Prepaid Top-up'),
('chapa_tx_ref_11223', 3, 220.00, 'Successful', '2025-05-29 15:10:30', NULL, 'Order'),
('chapa_tx_ref_44556', NULL, 500.00, 'Successful', '2024-04-15 11:00:00', 2, 'Prepaid Top-up'),
('chapa_tx_ref_77889', 4, 350.00, 'Successful', '2025-05-29 16:41:00', NULL, 'Order'),
('chapa_tx_ref_00112', NULL, 800.00, 'Successful', '2024-06-01 10:00:00', 3, 'Prepaid Top-up'),
('chapa_tx_ref_33445', 6, 280.00, 'Successful', '2025-05-29 18:06:00', NULL, 'Order'),
('chapa_tx_ref_66778', NULL, 1200.00, 'Successful', '2024-08-10 14:00:00', 4, 'Prepaid Top-up'),
('chapa_tx_ref_99001', 8, 280.00, 'Successful', '2025-05-29 20:11:00', NULL, 'Order'),
('chapa_tx_ref_22334', 9, 640.00, 'Successful', '2025-05-29 21:16:00', NULL, 'Order');