USE cs353test;

SELECT * FROM course;

SELECT max(price)
FROM course
GROUP BY category;

SELECT min(price)
FROM course
GROUP BY category;

SELECT avg(price)
FROM course
GROUP BY category;




