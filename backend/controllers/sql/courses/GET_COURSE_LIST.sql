SELECT C.course_id
     , course_name
     , course_summary
     , price
     , category
     , I.instructor_id
     , publish_date
FROM course C,
     publish P,
     instructor I
where C.course_id = P.course_id
  AND I.instructor_id = P.instructor_id
# course thumbnail???
