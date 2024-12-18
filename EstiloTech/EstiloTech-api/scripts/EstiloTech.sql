-- Base de datos
DROP DATABASE IF EXISTS EstiloTech;

CREATE DATABASE EstiloTech;
USE EstiloTech;

-- Crear las tablas
CREATE TABLE Marcas (
    marca_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(100) NOT NULL
);

CREATE TABLE Prendas (
    prenda_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    talla VARCHAR(10),
    color VARCHAR(50),
    precio DECIMAL(10, 2),
    marca_id INT,
    stock INT,
    FOREIGN KEY (marca_id) REFERENCES Marcas(marca_id) ON DELETE CASCADE 
);

CREATE TABLE Clientes (
    cliente_id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido_1 VARCHAR(100) NOT NULL,
    apellido_2 VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefono VARCHAR(20)
);

CREATE TABLE Ventas (
    venta_id INT PRIMARY KEY AUTO_INCREMENT,
    fecha_venta DATETIME NOT NULL,
    cliente_id INT,
    prenda_id INT,
    cantidad INT,
    subtotal DECIMAL(10, 2),
    FOREIGN KEY (cliente_id) REFERENCES Clientes(cliente_id) ON DELETE CASCADE, 
    FOREIGN KEY (prenda_id) REFERENCES Prendas(prenda_id) ON DELETE CASCADE
);

-- Inserción de datos
INSERT INTO Marcas (nombre, descripcion) VALUES 
('Nike', 'Marca líder en ropa y calzado deportivo.'),
('Adidas', 'Reconocida por su innovadora ropa y calzado deportivo.'),
('Zara', 'Tienda de moda rápida con tendencias actuales.'),
('Puma', 'Marca deportiva con un enfoque en la moda y el rendimiento.'),
('Gucci', 'Marca de lujo italiana conocida por su moda exclusiva.');

INSERT INTO Prendas (nombre, talla, color, precio, marca_id, stock) VALUES 
('Camisa Casual', 'M', 'Azul Claro', 29.99, 1, 50),
('Pantalón Deportivo', 'L', 'Negro', 39.99, 2, 30),
('Vestido de Noche', 'S', 'Rojo Intenso', 59.99, 3, 20),
('Chaqueta de Cuero', 'M', 'Negro', 89.99, 4, 15),
('Camiseta Básica', 'L', 'Blanco', 19.99, 5, 25),
('Camisa de Rayas', 'M', 'Rojo y Blanco', 34.99, 1, 40),
('Pantalón Cargo', 'XL', 'Verde Oliva', 49.99, 2, 20),
('Vestido Floral', 'M', 'Multicolor', 44.99, 3, 15),
('Chaqueta Impermeable', 'L', 'Azul Marino', 69.99, 4, 10),
('Camiseta Gráfica', 'S', 'Negro', 24.99, 5, 30);

INSERT INTO Clientes (nombre, apellido_1, apellido_2, email, telefono) VALUES 
('Juan', 'Pérez', 'Gómez', 'juan@example.com', '123456789'),
('María', 'García', 'López', 'maria@example.com', '987654321'),
('Luis', 'Martínez', 'Fernández', 'luis@example.com', '456789123'),
('Carlos', 'López', 'Mendoza', 'carlos.lopez@email.com', '555-8765'),
('Ana', 'Martínez', 'Ríos', 'ana.martinez@email.com', '555-4321');

INSERT INTO Ventas (fecha_venta, cliente_id, prenda_id, cantidad, subtotal) VALUES 
('2023-10-01 10:00:00', 1, 1, 2, 59.98),    
('2023-10-02 11:00:00', 2, 2, 1, 39.99),    
('2023-10-02 12:30:00', 3, 3, 1, 49.99),    
('2023-10-03 14:00:00', 4, 4, 2, 119.98),   
('2023-10-03 15:00:00', 5, 5, 5, 99.95),    
('2023-10-04 09:00:00', 1, 6, 3, 89.97),    
('2023-10-05 10:00:00', 2, 7, 2, 79.98),    
('2023-10-05 11:30:00', 3, 8, 1, 49.99),    
('2023-10-06 14:00:00', 4, 9, 1, 59.99),    
('2023-10-06 15:15:00', 5, 10, 4, 79.96);

-- Eliminación
DELETE FROM Prendas WHERE prenda_id = 5; 

-- Actualización
UPDATE Clientes SET email = 'juanp@example.com' WHERE cliente_id = 1; 
UPDATE Clientes SET telefono = '999999999' WHERE cliente_id = 2;

-- Obtener la cantidad vendida de prendas por fecha y filtrada por fecha
SELECT fecha_venta, SUM(cantidad) AS total_vendido
FROM Ventas
WHERE DATE(fecha_venta) = '2023-10-06'
GROUP BY fecha_venta;

SELECT fecha_venta, SUM(cantidad) AS total_vendido
FROM Ventas
WHERE DATE(fecha_venta) = '2023-10-05'
GROUP BY fecha_venta;

-- Creación de vistas
-- Obtener la lista de todas las marcas que tienen al menos una venta
CREATE OR REPLACE VIEW MarcasAlMenosUnaVentas AS
SELECT DISTINCT m.marca_id, m.nombre
FROM Marcas m
JOIN Prendas p ON m.marca_id = p.marca_id
JOIN Ventas v ON p.prenda_id = v.prenda_id;

-- Obtener prendas vendidas y su cantidad restante en stock
CREATE OR REPLACE VIEW PrendasVendidasYCantidadStock AS
SELECT p.prenda_id, p.nombre, p.stock, 
IFNULL(SUM(v.cantidad), 0) AS cantidad_vendida,
(p.stock - IFNULL(SUM(v.cantidad), 0)) AS stock_restante
FROM Prendas p
LEFT JOIN Ventas v ON p.prenda_id = v.prenda_id
GROUP BY p.prenda_id;

-- Obtener listado de las 5 marcas más vendidas y su cantidad de ventas
CREATE OR REPLACE VIEW CincoMarcasMasVendidas AS
SELECT m.marca_id, m.nombre, COUNT(v.venta_id) AS cantidad_ventas
FROM Marcas m
JOIN Prendas p ON m.marca_id = p.marca_id
JOIN Ventas v ON p.prenda_id = v.prenda_id
GROUP BY m.marca_id
ORDER BY cantidad_ventas DESC
LIMIT 5;
