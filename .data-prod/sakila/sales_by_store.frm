TYPE=VIEW
query=select concat(`c`.`city`,_utf8mb4\',\',`cy`.`country`) AS `store`,concat(`m`.`first_name`,_utf8mb4\' \',`m`.`last_name`) AS `manager`,sum(`p`.`amount`) AS `total_sales` from (((((((`sakila`.`payment` `p` join `sakila`.`rental` `r` on(`p`.`rental_id` = `r`.`rental_id`)) join `sakila`.`inventory` `i` on(`r`.`inventory_id` = `i`.`inventory_id`)) join `sakila`.`store` `s` on(`i`.`store_id` = `s`.`store_id`)) join `sakila`.`address` `a` on(`s`.`address_id` = `a`.`address_id`)) join `sakila`.`city` `c` on(`a`.`city_id` = `c`.`city_id`)) join `sakila`.`country` `cy` on(`c`.`country_id` = `cy`.`country_id`)) join `sakila`.`staff` `m` on(`s`.`manager_staff_id` = `m`.`staff_id`)) group by `s`.`store_id` order by `cy`.`country`,`c`.`city`
md5=67af206b7bd608652933707aa0dcc7a5
updatable=0
algorithm=0
definer_user=root
definer_host=localhost
suid=2
with_check_option=0
timestamp=0001741945749136624
create-version=2
source=SELECT\n    CONCAT(c.city, _utf8mb4\',\', cy.country) AS store\n     , CONCAT(m.first_name, _utf8mb4\' \', m.last_name) AS manager\n     , SUM(p.amount) AS total_sales\nFROM payment AS p\n         INNER JOIN rental AS r ON p.rental_id = r.rental_id\n         INNER JOIN inventory AS i ON r.inventory_id = i.inventory_id\n         INNER JOIN store AS s ON i.store_id = s.store_id\n         INNER JOIN address AS a ON s.address_id = a.address_id\n         INNER JOIN city AS c ON a.city_id = c.city_id\n         INNER JOIN country AS cy ON c.country_id = cy.country_id\n         INNER JOIN staff AS m ON s.manager_staff_id = m.staff_id\nGROUP BY s.store_id\nORDER BY cy.country, c.city
client_cs_name=utf8mb4
connection_cl_name=utf8mb4_uca1400_ai_ci
view_body_utf8=select concat(`c`.`city`,\',\',`cy`.`country`) AS `store`,concat(`m`.`first_name`,\' \',`m`.`last_name`) AS `manager`,sum(`p`.`amount`) AS `total_sales` from (((((((`sakila`.`payment` `p` join `sakila`.`rental` `r` on(`p`.`rental_id` = `r`.`rental_id`)) join `sakila`.`inventory` `i` on(`r`.`inventory_id` = `i`.`inventory_id`)) join `sakila`.`store` `s` on(`i`.`store_id` = `s`.`store_id`)) join `sakila`.`address` `a` on(`s`.`address_id` = `a`.`address_id`)) join `sakila`.`city` `c` on(`a`.`city_id` = `c`.`city_id`)) join `sakila`.`country` `cy` on(`c`.`country_id` = `cy`.`country_id`)) join `sakila`.`staff` `m` on(`s`.`manager_staff_id` = `m`.`staff_id`)) group by `s`.`store_id` order by `cy`.`country`,`c`.`city`
mariadb-version=110702
