const usersRouter = require("express").Router()
const bcrypt = require('bcrypt')

const db = require("../services/db")
const {getOffset, emptyOrRows} = require("../utils/helper")
const {listPerPage} = require("../utils/config")
const {GET_LECTURES, GET_COMPLETED_LECTURES, GET_COURSE_ASSIGNMENTS_QUIZ} = require('./sql/courses')
//
// ...
//
// add course to wishlist
// courseRouter.post("/wishes", async (req, res) => {
// })

// /:userId/courses get courses bought by student or created by instructor, (completion rates too)
usersRouter.get("/students/profile", [async (req, res, next) => {
    const {studentId, adminId, instructorId} = req
    console.log(studentId)
    try {
        const profileData = await db.query('SELECT user_id, name, surname, email_address, balance, reg_date FROM useracc u where user_id = ?', [studentId])
        const courses = await db.query(`SELECT s.student_id,
                                               c.course_id,
                                               b.price,
                                               buy_date,
                                               course_name,
                                               course_summary,
                                               category,
                                               u.name    as instructor_name,
                                               u.surname as instructor_surname,
                                               c2.certificate_id
                                        FROM student s
                                                 JOIN buys b ON s.student_id = ? AND s.student_id = b.student_id
                                                 JOIN course c ON b.course_id = c.course_id
                                                 JOIN publish p on c.course_id = p.course_id
                                                 JOIn useracc u on p.instructor_id = u.user_id
                                                 LEFT JOIN certificate c2 on c.course_id = c2.course_id
                                                 LEFT JOIN earns e on c2.certificate_id = e.certificate_id
        `, [studentId])
        // const refundRequests  = // todo
        const wishlist = await db.query(`SELECT *
                                         FROM course
                                                  natural join addtowishlist
                                         WHERE student_id = ?`, [studentId])
        const certificates = await db.query(`SELECT *
                                             FROM certificate
                                                      NATURAL JOIN earns
                                             WHERE student_id = ?`, [studentId])
        res.json({profile: profileData[0], courses, wishlist, certificates})
    } catch (exception) {
        next(exception)
    }
}])
usersRouter.get("/courses", [async (req, res, next) => {
    const {studentId, adminId, instructorId} = req
    try {
        const result = await db.query(`SELECT *
                                       FROM course
                                                NATURAL JOIN buys
                                       WHERE student_id = ?`, [studentId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

usersRouter.get("/instructor/courses", [async (req, res, next) => {
    const {studentId, adminId, instructorId} = req
    try {
        const result = await db.query(`SELECT *
                                       FROM course
                                                NATURAL JOIN publish
                                       WHERE instructor_id = ?`, [instructorId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])


// /:userId/wishes GET(get users' wishlist) POST(add course to wishlist
usersRouter.get("/wishes", [async (req, res, next) => {
    const {studentId, adminId, instructorId} = req
    try {
        const result = await db.query(`SELECT *
                                       FROM course
                                                natural join addtowishlist
                                       WHERE student_id = ?`, [studentId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

usersRouter.post("/wishes", [async (req, res, next) => {
    const {studentId, adminId, instructorId} = req
    const {courseId} = req.body
    try {
        const result = await db.query(`INSERT INTO addtowishlist
                                       VALUES (?, ?)`, [studentId, courseId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

usersRouter.delete("/students/wishes", [async (req, res, next) => {
    const {studentId, adminId, instructorId} = req
    const {courseId} = req.body
    try {
        const result = await db.query(`DELETE
                                       FROM addtowishlist
                                       WHERE student_id = ?
                                         AND course_id = ?`, [studentId, courseId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

// /:userId/certificates
usersRouter.get("/certificates", [async (req, res, next) => {
    const {studentId, adminId, instructorId} = req
    try {
        const result = await db.query(`SELECT *
                                       FROM certificate
                                                NATURAL JOIN earns
                                       WHERE student_id = ?`, [studentId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])


// /:userId/certificates/:courseId
usersRouter.get("/certificates/:courseId", [async (req, res, next) => {
    const {studentId, adminId, instructorId} = req
    try {
        const {courseId} = req.params
        const result = await db.query(`SELECT C.certificate_id,
                                              certification_text,
                                              final_grade,
                                              cdate,
                                              course_name,
                                              course_summary,
                                              name,
                                              surname
                                       FROM certificate C
                                                JOIN earns e on C.certificate_id = e.certificate_id
                                                JOIN course c2 on C.course_id = c2.course_id
                                                JOIN useracc u on e.student_id = u.user_id
                                       WHERE student_id = ?
                                         AND C.course_id = ?`, [studentId, courseId])

        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

usersRouter.post('/certificates/:courseId', async (req, res, next) => {
    const {courseId} = req.params
    const {studentId, adminId, instructorId} = req

    try {
        const lectures = await db.query(GET_LECTURES, [courseId])
        const completedLectures = await db.query(GET_COMPLETED_LECTURES, [courseId, studentId])
        const quizzes = await db.query(GET_COURSE_ASSIGNMENTS_QUIZ, [courseId])
        const answers = await db.query(`SELECT a.assignment_id, (SUM(a2.score) / COUNT(a2.score)) * 100 as score
                                        FROM assignmentmaterial a
                                                 JOIN quiz q on a.assignment_id = q.quiz_id
                                                 JOIN quizquestion q2 on q.quiz_id = q2.assignment_id
                                                 JOIN answers a2
                                                      on q2.assignment_id = q.quiz_id AND q2.question_id = a2.question_id
                                        WHERE a.course_id = ?
                                          AND a2.student_id = ?
                                        GROUP BY a.assignment_id`, [courseId, studentId])
        const finalGrade = answers.map(a => a.score).reduce((tot, num) => tot + num, 0) / answers.length * 100
        const [certificate,] = await db.query('SELECT certificate_id, certification_text, course_id FROM certificate c WHERE c.course_id = ?', [courseId])
        if ((lectures.length + quizzes.length) === (completedLectures.length + answers.length)) {
            const result = await db.query(`INSERT INTO earns(student_id, certificate_id, final_grade, cdate)
                                           VALUES (?, ?, ?, SYSDATE()) `, [studentId, certificate.certificate_id, finalGrade])
            console.log(result)
            res.json(result)
        } else {
            res.status(401).json({error: "Certificate cannot be earned"})
        }
    } catch (exception) {
        next(exception)
    }

})

// /complaints GET ?adminId=, POST post a new complaint, PUT(resolve) ?complaintId=
usersRouter.get("/complaints/:adminId", [async (req, res, next) => {
    try {
        const {adminId} = req.params
        const result = await db.query(`SELECT *
                                       FROM complains
                                       WHERE admin_id = ?`, [adminId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

usersRouter.post("/complaints", [async (req, res, next) => {
    try {
        const {instructorId, studentId} = req
        const {courseId, reason, price, category, certificationText} = req.body
        const adminId = await db.query(`SELECT admin_id
                                        FROM siteadmin
                                        ORDER BY RAND()
                                        LIMIT 1`)
        const result = await db.query(`INSERT INTO complains(admin_id, student_id, course_id, reason, complain_date, resolved)
                                       VALUES (?, ?, ?, ?, SYSDATE(), 0)`, [adminId, studentId, courseId, reason])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

usersRouter.post("/requestRefund", [async (req, res, next) => {
    const {studentId, adminId, instructorId} = req
    try {
        const [admin,] = await db.query(`SELECT admin_id
                                         FROM siteadmin
                                         ORDER BY RAND()
                                         LIMIT 1`)
        const {courseId, reason} = req.body
        const result = await db.query(`INSERT INTO requestrefund(student_id, admin_id, course_id, reason, complain_date,
                                                                 resolved, is_read)
                                       VALUES (?, ?, ?, ?, SYSDATE(), ?, ?)`, [studentId, admin.admin_id, courseId, reason, 0, 0])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])
//

// /:userId/notifications get notifications of the user


module.exports = usersRouter
