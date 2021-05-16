USE cs353test;

SELECT * FROM student NATURAL JOIN course;

SELECT category, Q.student_count AS student_count
FROM (SELECT count(student_id) AS student_count, course_id FROM buys B  GROUP BY course_id)
    AS Q NATURAL JOIN course
GROUP BY category
ORDER BY Q.student_count DESC;
