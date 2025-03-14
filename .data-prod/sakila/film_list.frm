TYPE=VIEW
query=select `sakila`.`film`.`film_id` AS `FID`,`sakila`.`film`.`title` AS `title`,`sakila`.`film`.`description` AS `description`,`sakila`.`category`.`name` AS `category`,`sakila`.`film`.`rental_rate` AS `price`,`sakila`.`film`.`length` AS `length`,`sakila`.`film`.`rating` AS `rating`,group_concat(concat(`sakila`.`actor`.`first_name`,_utf8mb4\' \',`sakila`.`actor`.`last_name`) separator \', \') AS `actors` from ((((`sakila`.`category` left join `sakila`.`film_category` on(`sakila`.`category`.`category_id` = `sakila`.`film_category`.`category_id`)) left join `sakila`.`film` on(`sakila`.`film_category`.`film_id` = `sakila`.`film`.`film_id`)) join `sakila`.`film_actor` on(`sakila`.`film`.`film_id` = `sakila`.`film_actor`.`film_id`)) join `sakila`.`actor` on(`sakila`.`film_actor`.`actor_id` = `sakila`.`actor`.`actor_id`)) group by `sakila`.`film`.`film_id`,`sakila`.`category`.`name`
md5=81ab3507e8fde8efcedf45f758323d81
updatable=0
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=0001741945749133733
create-version=2
source=SELECT film.film_id AS FID, film.title AS title, film.description AS description, category.name AS category, film.rental_rate AS price,\n       film.length AS length, film.rating AS rating, GROUP_CONCAT(CONCAT(actor.first_name, _utf8mb4\' \', actor.last_name) SEPARATOR \', \') AS actors\nFROM category LEFT JOIN film_category ON category.category_id = film_category.category_id LEFT JOIN film ON film_category.film_id = film.film_id\n              JOIN film_actor ON film.film_id = film_actor.film_id\n              JOIN actor ON film_actor.actor_id = actor.actor_id\nGROUP BY film.film_id, category.name
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_uca1400_ai_ci
view_body_utf8=select `sakila`.`film`.`film_id` AS `FID`,`sakila`.`film`.`title` AS `title`,`sakila`.`film`.`description` AS `description`,`sakila`.`category`.`name` AS `category`,`sakila`.`film`.`rental_rate` AS `price`,`sakila`.`film`.`length` AS `length`,`sakila`.`film`.`rating` AS `rating`,group_concat(concat(`sakila`.`actor`.`first_name`,\' \',`sakila`.`actor`.`last_name`) separator \', \') AS `actors` from ((((`sakila`.`category` left join `sakila`.`film_category` on(`sakila`.`category`.`category_id` = `sakila`.`film_category`.`category_id`)) left join `sakila`.`film` on(`sakila`.`film_category`.`film_id` = `sakila`.`film`.`film_id`)) join `sakila`.`film_actor` on(`sakila`.`film`.`film_id` = `sakila`.`film_actor`.`film_id`)) join `sakila`.`actor` on(`sakila`.`film_actor`.`actor_id` = `sakila`.`actor`.`actor_id`)) group by `sakila`.`film`.`film_id`,`sakila`.`category`.`name`
mariadb-version=110702
