USE cs353test;

SELECT * FROM lecture NATURAL JOIN course;

SELECT category, Q.lecture_count AS lecture_count
FROM (SELECT count(lecture_id) AS lecture_count, course_id FROM lecture L  GROUP BY course_id) AS Q NATURAL JOIN course
GROUP BY category
ORDER BY Q.lecture_count DESC;