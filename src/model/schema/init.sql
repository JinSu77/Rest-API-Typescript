/*
Script de création de la base de données `sakila`.
*/
create database IF NOT EXISTS sakila;

/* Créer l'utilisateur API */
create user IF NOT EXISTS 'api-dev'@'%.%.%.%' identified by 'api-dev-password';
grant select, update, insert, delete on sakila.* to 'api-dev'@'%.%.%.%';
flush privileges;