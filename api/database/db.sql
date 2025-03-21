CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'user')),
);


CREATE TABLE types (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
);

CREATE TABLE properties (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('texto', 'numero', 'fecha', 'check')),
);

CREATE TABLE propertyType (
    id SERIAL PRIMARY KEY,
    property_id INT NOT NULL,
    type_id INT NOT NULL,
    FOREIGN KEY (property_id) REFERENCES properties(id),
    FOREIGN KEY (type_id) REFERENCES types(id)
);

INSERT INTO "Types" (name, description, "createdAt", "updatedAt") VALUES
('Vehículo', 'Elementos relacionados con vehículos', NOW(), NOW()),
('Inmueble', 'Propiedades inmobiliarias', NOW(), NOW()),
('Electrodoméstico', 'Equipos electrónicos y electrodomésticos', NOW(), NOW());

INSERT INTO "Properties" (name, type, "createdAt") VALUES
('Color', 'text', NOW()),
('Precio', 'number', NOW()),
('Fecha de fabricación', 'date', NOW()),
('Garantía incluida', 'checkbox', NOW());

INSERT INTO "PropertyTypes" (property_id, type_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(2, 2),
(3, 2),
(4, 3);
