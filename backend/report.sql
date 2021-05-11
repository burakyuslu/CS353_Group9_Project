USE dbname;

SELECT
    course.course_id AS CourseID,
    course.price AS Price,
    useracc.user_id AS StudentID,
    qna.qna_id AS QnaThread
FROM
    course
        INNER JOIN
    (
        SELECT
                doc->>'$.course_id' AS CourseID
        FROM
            Course
    ) AS Course
