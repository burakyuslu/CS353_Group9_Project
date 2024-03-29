module.exports.GET_COURSE_LIST = `
    SELECT C.course_id,
           course_name,
           course_summary,
           price,
           category,
           discountable,
           percentage,
           name,
           surname
    FROM course C,
         publish P,
         instructor I
             join useracc U on I.instructor_id = U.user_id
    where C.course_id = P.course_id
      AND I.instructor_id = P.instructor_id`


// transactiona gecir?
module.exports.POST_COURSE1 = `
    INSERT INTO course(course_name, course_summary, price, category, discountable, percentage)
    VALUES (?, ?, ?, ?, ?,?);`


module.exports.POST_COURSE2 = `
    INSERT INTO certificate(certification_text, course_id)
    VALUES (?, ?);
    INSERT INTO publish(course_id, instructor_id, publish_date)
    VALUES (?, ?, SYSDATE());
    INSERT INTO qna(course_id)
    VALUES (?);
`

module.exports.GET_COURSE = `
    SELECT C.course_id,
           course_name,
           course_summary,
           price,
           category,
           discountable,
           percentage,
           publish_date,
           user_id,
           name,
           surname
    FROM course C
             join publish p
                  on C.course_id = ? AND C.course_id = p.course_id
             join useracc u on u.user_id = p.instructor_id
`

module.exports.GET_COURSE_CERTIFICATE = `
    SELECT *
    FROM certificate
    WHERE course_id = ?
`

module.exports.GET_COURSE_ANNOUNCEMENTS = `
    SELECT instructor_id, course_id, ann_date, ann_text
    FROM announcement
    WHERE course_id = ?
    ORDER BY ann_date DESC
`

module.exports.POST_COURSE_ANNOUNCEMENT = `
    INSERT INTO announcement(instructor_id, course_id, ann_date, ann_text)
    VALUES (?, ?, SYSDATE(), ?)
`

module.exports.GET_COURSE_RATINGS = `
    SELECT course_id, student_id, comment, rating, name as studentName
    FROM Rates R
             join useracc U on R.student_id = U.user_id
    WHERE R.course_id = ?`

module.exports.GET_AVERAGE_RATING = `
    SELECT avg(rating) as avgRating, COUNT(rating) as ratingCount
    FROM Rates R
    GROUP BY(course_id)
    HAVING course_id = ?`

module.exports.POST_COURSE_RATING = `
    INSERT INTO rates(course_id, student_id, comment, rating)
    VALUES (?, ?, ?, ?)
`


module.exports.GET_LECTURES = `
    SELECT lecture_id, lecture_name, course_id
    FROM Lecture
    WHERE course_id = ?
`

module.exports.POST_LECTURE = `
    INSERT
    INTO lecture(lecture_name, course_id, content, type)
    VALUES (?, ?, ?, ?);
`

module.exports.GET_LECTURE_CONTENT = `
    SELECT *
    FROM lecture
    where lecture_id = ? `

module.exports.GET_COMPLETED_LECTURES = `
    SELECT l.lecture_id,
           l.lecture_name
    FROM lecture l
             JOIN completes c on l.lecture_id = c.lecture_id AND course_id = ? AND student_id = ?
    ORDER BY l.lecture_id
    #     FROM course
#              JOIN lecture l on course.course_id = ? AND course.course_id = l.course_id
#              JOIN completes c on l.lecture_id = c.lecture_id AND c.student_id = ?
`
// SELECT lecture_id
// FROM lecture L
// WHERE exists(select * FROM completes c WHERE L.course_id = ? AND c.lecture_id = L.lecture_id AND student_id = ?)\`
module.exports.POST_COMPLETED_LECTURE = `INSERT INTO completes
                                         VALUES (?, ?)`

module.exports.GET_LECTURE_NOTES = `
    SELECT note_id, note_text, cdate
    FROM createsnote
    where student_id = ?
      AND lecture_id = ?
    ORDER BY cdate
`

module.exports.POST_LECTURE_NOTE = `
    INSERT INTO createsnote(note_text, cdate, student_id, lecture_id)
    VALUES (?, SYSDATE(), ?, ?)
`

module.exports.GET_QNA_THREADS = `
    SELECT q.qna_id,
           t.thread_id as id,
           t.post_text as title,
           t.user_id,
           u.name      as creator
    FROM qna q,
         thread t
             join useracc u on u.user_id = t.user_id
    WHERE q.course_id = ?
      AND q.qna_id = t.qna_id
`

module.exports.POST_QNA_THREAD = `
    INSERT INTO thread(post_text, user_id, qna_id)
    VALUES (?, ?, ?)
`

module.exports.GET_COURSE_QNA_THREAD_ENTRIES = `
    SELECT e.entry_id,
           e.entry_text as content,
           e.thread_id,
           e.user_id,
           u.name       as poster
    FROM thread t
             JOIN entry e on t.thread_id = e.thread_id AND t.thread_id = ?
             JOIN useracc u on u.user_id = e.user_id

#              join useracc u on e.thread_id = ? AND u.user_id = e.user_id
`

module.exports.POST_COURSE_QNA_THREAD_ENTRY = `
    INSERT INTO entry(entry_text, thread_id, user_id)
    VALUES (?, ?, ?)
`

module.exports.GET_COURSE_ASSIGNMENTS_PROJECT = `
    SELECT a1.assignment_id, course_id, weight, title, prompt
    FROM assignmentmaterial a1
             join project p on a1.assignment_id = p.assignment_id
    WHERE course_id = ?
`

module.exports.GET_COURSE_ASSIGNMENTS_QUIZ = `
    SELECT assignment_id, course_id, weight, quiz_id, quiz_name
    FROM assignmentmaterial a1
             join quiz q on a1.assignment_id = q.quiz_id
    WHERE course_id = ?
`
module.exports.POST_COURSE_ASSIGNMENT_QUIZ1 = `
    INSERT INTO assignmentmaterial(course_id, weight)
    VALUES (?, ?);`

module.exports.POST_COURSE_ASSIGNMENT_QUIZ2 = `
    INSERT INTO quiz(quiz_id, quiz_name)
    VALUES (?, ?);
`

//TODO:check later
module.exports.POST_COURSE_ASSIGNMENT_QUIZ_QUESTION1 = `
    INSERT INTO quizquestion(assignment_id, question_text, question_answer)
    VALUES (?, ?, ?);

`

module.exports.POST_COURSE_ASSIGNMENT_QUIZ_QUESTION2 = `
    INSERT INTO quizoption
    VALUES (?, ?),
           (?, ?),
           (?, ?),
           (?, ?);
`

module.exports.POST_COURSE_ASSIGNMENT_PROJECT = `
    INSERT INTO assignmentmaterial(course_id, weight)
    VALUES (?, ?);
`


module.exports.GET_COURSE_ASSIGNMENT_DETAILS = `SELECT q.question_id, assignment_id, question_text, question_option
                                                FROM quizquestion
                                                         join quizoption q on quizquestion.question_id = q.question_id
                                                where assignment_id = ?`

/*module.exports.POST_ASSIGNMENT_QUESTION = `INSERT INTO answers VALUES(?, ?, ?, ?);`*/

module.exports.GET_GRADING_PEER_SUBMISSION = ``

module.exports.POST_GRADING_PEER_ = ``
