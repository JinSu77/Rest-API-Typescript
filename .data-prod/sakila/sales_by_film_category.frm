TYPE=VIEW
query=select `c`.`name` AS `category`,sum(`p`.`amount`) AS `total_sales` from (((((`sakila`.`payment` `p` join `sakila`.`rental` `r` on(`p`.`rental_id` = `r`.`rental_id`)) join `sakila`.`inventory` `i` on(`r`.`inventory_id` = `i`.`inventory_id`)) join `sakila`.`film` `f` on(`i`.`film_id` = `f`.`film_id`)) join `sakila`.`film_category` `fc` on(`f`.`film_id` = `fc`.`film_id`)) join `sakila`.`category` `c` on(`fc`.`category_id` = `c`.`category_id`)) group by `c`.`name` order by sum(`p`.`amount`) desc
md5=4172e4a983a52833f320cc9120cd00fa
updatable=0
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=0001741945749137293
create-version=2
source=SELECT\n    c.name AS category\n     , SUM(p.amount) AS total_sales\nFROM payment AS p\n         INNER JOIN rental AS r ON p.rental_id = r.rental_id\n         INNER JOIN inventory AS i ON r.inventory_id = i.inventory_id\n         INNER JOIN film AS f ON i.film_id = f.film_id\n         INNER JOIN film_category AS fc ON f.film_id = fc.film_id\n         INNER JOIN category AS c ON fc.category_id = c.category_id\nGROUP BY c.name\nORDER BY total_sales DESC
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_uca1400_ai_ci
view_body_utf8=select `c`.`name` AS `category`,sum(`p`.`amount`) AS `total_sales` from (((((`sakila`.`payment` `p` join `sakila`.`rental` `r` on(`p`.`rental_id` = `r`.`rental_id`)) join `sakila`.`inventory` `i` on(`r`.`inventory_id` = `i`.`inventory_id`)) join `sakila`.`film` `f` on(`i`.`film_id` = `f`.`film_id`)) join `sakila`.`film_category` `fc` on(`f`.`film_id` = `fc`.`film_id`)) join `sakila`.`category` `c` on(`fc`.`category_id` = `c`.`category_id`)) group by `c`.`name` order by sum(`p`.`amount`) desc
mariadb-version=110702
