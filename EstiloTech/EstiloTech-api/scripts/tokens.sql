CREATE TABLE tokens (
    id_token INT PRIMARY KEY AUTO_INCREMENT,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO tokens (token, expires_at) VALUES
('expiredtoken123', '2023-10-01 12:00:00'),
('x9y8z7w6v5u4321', '2024-11-25 14:30:00'),
('m3n4o5p6q7r8901', '2024-11-28 08:00:00'),
('s2t3u4v5w6x7210', '2024-12-05 18:15:00'),
('d9e0f1g2h3i6547', '2024-11-22 09:45:00'),
('i7j8k9l0m1n8765', '2024-12-10 16:00:00'),
('o4p5q6r7s8t9210', '2024-11-30 12:00:00'),
('b6c7d8e9f0g1112', '2024-12-03 07:00:00'),
('v2w3x4y5z6a4530', '2024-11-27 19:00:00'),
('h8i9j0k1l2m7201', '2024-12-15 20:30:00');
