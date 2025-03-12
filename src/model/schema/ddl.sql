/* La définition de la schéma */
use sakila;

/* user */
create table if not exists user (
  id int auto_increment not null,
  email_address varchar(256) unique not null, 
  first_name varchar(256), 
  last_name varchar(256), 
  primary key(id)
);

drop trigger if exists before_insert_user;

create trigger before_insert_user
before insert
on user for each row set new.email = lower(trim(new.email));