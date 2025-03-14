USE sakila;

--
-- Table structure for table `users`
--

CREATE TABLE users (
                       id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
                       first_name VARCHAR(45) NOT NULL,
                       last_name VARCHAR(45) NOT NULL,
                       email_address VARCHAR(255) UNIQUE NOT NULL,
                       role_user ENUM('client', 'admin') NOT NULL DEFAULT 'client',
                       PRIMARY KEY  (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO users (first_name, last_name, email_address, role_user)
    VALUES ('Adrien', 'HA', 'adrien2098@hotmail.fr', 'admin');
