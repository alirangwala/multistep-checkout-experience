
DROP DATABASE IF EXISTS checkout;

CREATE DATABASE checkout;

USE checkout;

CREATE TABLE customer (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);

CREATE TABLE address (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  address_line_1 VARCHAR(255),
  address_line_2 VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zipcode VARCHAR(255),
  phone VARCHAR(255)
);

CREATE TABLE credit_card (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT NOT NULL,
  credit_card_number VARCHAR(255) NOT NULL,
  expiry_date VARCHAR(255),
  cvv VARCHAR(255),
  billing_zipcode VARCHAR(255)
);