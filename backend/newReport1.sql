USE cs353test;

SELECT * FROM course;

SELECT category, max(price) as maxPrice, min(price) as minPrice, avg(price) as avgPrice
FROM course
GROUP BY category;

SELECT min(price)
FROM course
GROUP BY category;

SELECT avg(price)
FROM course
GROUP BY category;




