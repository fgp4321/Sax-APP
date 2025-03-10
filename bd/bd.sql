CREATE DATABASE IF NOT EXISTS IncidenciasSax;
USE IncidenciasSax;

-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(9) NOT NULL UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,  -- Para almacenar contraseñas cifradas
    rol ENUM('ciudadano', 'admin') DEFAULT 'ciudadano',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL
);

-- Tabla de Tickets (Quejas, Incidencias y Sugerencias)
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    categoria ENUM('Incidencia', 'Queja', 'Sugerencia') NOT NULL,
    subcategoria ENUM(
        'Aceras y calzadas', 
        'Alumbrado', 
        'Animales muertos o abandonados', 
        'Limpieza de calles', 
        'Mobiliario urbano', 
        'Parques y jardines', 
        'Plagas de insectos y roedores', 
        'Puntos de agua', 
        'Señales', 
        'Vehículos abandonados', 
        'Otros'
    ) NOT NULL,
    descripcion TEXT NOT NULL,
    ubicacion VARCHAR(255) NULL, -- Dirección o coordenadas (Opcional)
    adjunto MEDIUMBLOB NULL, -- Para archivos adjuntos (Guardar JSON si son varios)
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índice para acelerar las búsquedas por usuario
CREATE INDEX idx_usuario_id ON incidencias(usuario_id);

-- Control de abuso: Evita que un usuario envíe más de 1 incidencia por minuto
CREATE TABLE control_abuso (
    usuario_id INT NOT NULL,
    ultima_incidencia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

DELIMITER //
CREATE TRIGGER antes_insertar_incidencia
BEFORE INSERT ON incidencias
FOR EACH ROW
BEGIN
    DECLARE ultima TIMESTAMP;
    
    -- Consultar la última incidencia del usuario
    SELECT ultima_incidencia INTO ultima 
    FROM control_abuso 
    WHERE usuario_id = NEW.usuario_id;
    
    -- Si el usuario ya tiene un registro y no ha pasado 1 minuto, bloquear el insert
    IF ultima IS NOT NULL AND TIMESTAMPDIFF(SECOND, ultima, NOW()) < 60 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Demasiadas incidencias. Espere un momento antes de enviar otra.';
    END IF;
    
    -- Actualizar el registro de control_abuso
    INSERT INTO control_abuso (usuario_id, ultima_incidencia)
    VALUES (NEW.usuario_id, NOW())
    ON DUPLICATE KEY UPDATE ultima_incidencia = NOW();
END;
//
DELIMITER ;
