const {
    GET_COMPLETED_LECTURES,
    GET_COURSE,
    GET_COURSE_ANNOUNCEMENTS,
    GET_COURSE_ASSIGNMENTS_QUIZ,
    GET_COURSE_CERTIFICATE,
    GET_COURSE_LIST,
    GET_QNA_THREADS,
    GET_COURSE_ASSIGNMENT_DETAILS,
    GET_COURSE_QNA_THREAD_ENTRIES,
    GET_COURSE_RATINGS,
    GET_AVERAGE_RATING,
    GET_LECTURE_CONTENT,
    GET_LECTURE_NOTES,
    GET_LECTURES,
    POST_COMPLETED_LECTURE,
    POST_COURSE,
    POST_COURSE_ANNOUNCEMENT,
    POST_COURSE_ASSIGNMENT_QUIZ1,
    POST_COURSE_ASSIGNMENT_QUIZ2,
    POST_COURSE_ASSIGNMENT_SUBMISSION,
    POST_COURSE_ASSIGNMENT_QUIZ_QUESTION1,
    POST_COURSE_ASSIGNMENT_QUIZ_QUESTION2,
    POST_COURSE_QNA_THREAD_ENTRY,
    POST_COURSE_RATING,
    POST_LECTURE,
    POST_LECTURE_NOTE,
    POST_QNA_THREAD
} = require("./sql/courses");

const courseRouter = require("express").Router()
const bcrypt = require('bcrypt')

const db = require("../services/db")
const courses = require("./sql/courses")
const {getOffset, emptyOrRows} = require("../utils/helper")
const {listPerPage} = require("../utils/config")


const authenticate = ({expected, userId, res, req}) => {
    const user = userId ? userId : 1
    return user
}


// get course lists
courseRouter.get("/", async (req, res, next) => {
    const {ratingLow, ratingHigh, search} = req.query

    let query = GET_COURSE_LIST;
    var params;
    console.log(`hey: ${ratingLow}, ${ratingHigh}, ${search}`)

    const AVG_QUERY = `(SELECT avg(rating)
                       FROM Rates R
                       WHERE R.course_id = P.course_id)`

    if (search === undefined || search === "") {
        // query += ` AND ( ${AVG_QUERY} ) >= ? AND ( ${AVG_QUERY} ) =< ?`
        query += `\nAND ${AVG_QUERY} BETWEEN ? AND ?`
        params = [ratingLow, ratingHigh];
    } else {
        // query += ` AND ( ${AVG_QUERY} ) >= ? AND ( ${AVG_QUERY} ) =< ? AND course_name LIKE ?`
        // query += `\nAND (('%'C.course_name + '%' LIKE '${search}') OR  )`
        query += `\nAND ${AVG_QUERY} BETWEEN ? AND ?`
        // params = [search, ratingLow, ratingHigh];
        params = [ratingLow, ratingHigh];
    }

    console.log(query)
    try {
        const result = await db.query(query, params)
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// post and publish a course without any lectures
courseRouter.post("/", [async (req, res, next) => {
    const {instructorId} = req
    try {
        const {courseName, courseSummary, price, category, certificationText} = req.body
        const result = await db.query(POST_COURSE,
            [courseName, courseSummary, price, category, instructorId, certificationText])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

// get course details
courseRouter.get("/:courseId", [async (req, res, next) => {
    const {studentId} = req
    try {
        const {courseId} = req.params
        const [course,] = await db.query(GET_COURSE, [courseId])
        const ratings = await db.query(GET_COURSE_RATINGS, [courseId])
        const [{avgRating, ratingCount},] = await db.query(GET_AVERAGE_RATING, [courseId])
        const lectures = await db.query(GET_LECTURES, [courseId])
        const [studentCount,] = await db.query(`SELECT count(c.course_id) as count
                                                FROM course c
                                                         JOIN buys b ON c.course_id = ? AND c.course_id = b.course_id
        `, [courseId])
        let completedLectures
        let wishlist, studentCourses, certificate
        if (studentId) {

            completedLectures = await db.query(GET_COMPLETED_LECTURES, [courseId, studentId])
            wishlist = await db.query(`SELECT course_id
                                       FROM course
                                                natural join addtowishlist
                                       WHERE student_id = ?`, [studentId])
            studentCourses = await db.query(`SELECT course_id

                                             FROM student s
                                                      JOIN buys b ON s.student_id = ? AND s.student_id = b.student_id`, [studentId])

        }
        res.json({
            course,
            ratings,
            avgRating,
            ratingCount,
            lectures,
            completedLectures: completedLectures?.map(l => l.lecture_id),
            studentCount: studentCount.count,
            wishlist: wishlist?.map(c => c.course_id),
            studentCourses: studentCourses?.map(c => c.course_id)
        })
    } catch
        (exception) {
        next(exception)
    }
}

// todo paywall...
])

// course certificate
courseRouter.get("/:courseId/certificate", async (req, res, next) => {
    const {instructorId} = req
    try {
        const {courseId} = req.params
        const result = await db.query(GET_COURSE_CERTIFICATE, [courseId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// post course certificate
// courseRouter.post("/:courseId/certificate", async (req, res, next) => {
// try {
//
// } catch (exception) {
// next (exception)
// }
// })

courseRouter.get("/:courseId/announcements", async (req, res, next) => {
    const {instructorId, studentId} = req
    try {
        const {courseId} = req.params
        const result = await db.query(GET_COURSE_ANNOUNCEMENTS, [courseId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// post course announcement
courseRouter.post("/:courseId/announcements", async (req, res, next) => {
    const {instructorId} = req
    try {
        const {courseId, announcementText} = req.body
        const result = await db.query(POST_COURSE_ANNOUNCEMENT, [instructorId, courseId, announcementText])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// get course ratings
courseRouter.get("/:courseId/ratings", async (req, res, next) => {
    const {instructorId, studentId} = req
    try {
        const {courseId} = req.params
        const ratings = await db.query(GET_COURSE_RATINGS, [courseId])
        const averageRating = await db.query(GET_AVERAGE_RATING, [courseId])
        res.json({ratings, averageRating})
    } catch (exception) {
        next(exception)
    }
})

// post course rating
courseRouter.post("/:courseId/ratings", async (req, res, next) => {
    const {instructorId, studentId} = req
    try {
        const {courseId} = req.params
        const {studentId, comment, rating} = req.body
        const result = await db.query(POST_COURSE_RATING, [courseId, studentId, comment, rating])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})


// gets all lecture titles
// and completed information
courseRouter.get("/:courseId/lectures", async (req, res, next) => {
    const {instructorId, studentId} = req
    try {
        const {courseId} = req.params
        const result = await db.query(GET_LECTURES, [courseId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// posts a lecture to a course
courseRouter.post("/:courseId/lectures", async (req, res, next) => {
    try {
        const {courseId} = req.params
        const {lectureName, content, type} = req.body
        const result = await db.query(POST_LECTURE, [lectureName, courseId, content, type])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})
courseRouter.get("/:courseId/lectures/completed-lectures", async (req, res, next) => {
    const {studentId} = req
    console.log(`
            here ${req.instructorId}, ${req.studentId}`)
    try {
        const result = await db.query(GET_COMPLETED_LECTURES, [studentId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

courseRouter.post("/:courseId/lectures/completed-lectures", async (req, res, next) => {
    const {studentId} = req
    try {
        const {lectureId, studentId} = req.body
        const result = await db.query(POST_COMPLETED_LECTURE, [studentId, lectureId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// gets all lecture content by id
courseRouter.get("/:courseId/lectures/:lectureId", async (req, res, next) => {
    const {studentId} = req
    try {
        const {courseId, lectureId} = req.params
        const lectures = await db.query(GET_LECTURES, [courseId])
        const [content,] = await db.query(GET_LECTURE_CONTENT, [lectureId])
        const quizzes = await db.query(GET_COURSE_ASSIGNMENTS_QUIZ, [courseId])
        const qna = await db.query(GET_QNA_THREADS, [courseId])
        let notes, completedLectures

        const answers = await db.query(`SELECT a.assignment_id, (SUM(a2.score) / COUNT(a2.score)) * 100 as score
                                        FROM assignmentmaterial a
                                                 JOIN quiz q on a.assignment_id = q.quiz_id
                                                 JOIN quizquestion q2 on q.quiz_id = q2.assignment_id
                                                 JOIN answers a2
                                                      on q2.assignment_id = q.quiz_id AND q2.question_id = a2.question_id
                                        WHERE a.course_id = ?
                                          AND a2.student_id = ?
                                        GROUP BY a.assignment_id`, [courseId, studentId])

        const announcements = await db.query(GET_COURSE_ANNOUNCEMENTS, [courseId])
        let certificate
        if (studentId) {
            certificate = await db.query(`SELECT c.certificate_id
                                          FROM course
                                                   JOIN certificate c on course.course_id = ? AND course.course_id = c.course_id
                                                   JOIN earns e on c.certificate_id = e.certificate_id
                                          WHERE e.student_id = ?`, [courseId, studentId])
            notes = await db.query(GET_LECTURE_NOTES, [studentId, lectureId])
            completedLectures = await db.query(GET_COMPLETED_LECTURES, [courseId, studentId])
        }
        res.json({
            content,
            lectures,
            qna,
            notes,
            announcements,
            quizzes,
            answers,
            certificate,
            completedLectures: completedLectures?.map(l => l.lecture_id),
        })
    } catch (exception) {
        next(exception)
    }
})


// get notes for the lecture
courseRouter.get("/:courseId/lectures/:lectureId/notes", async (req, res, next) => {
    const {studentId} = req
    try {
        // const {noteText} = req.body
        const {lectureId} = req.params
        const result = await db.query(GET_LECTURE_NOTES,
            [noteText, studentId, lectureId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// post notes for the lecture
courseRouter.post("/:courseId/lectures/:lectureId/notes", async (req, res, next) => {
    // const {studentId} = req
    try {
        const {studentId, noteText} = req.body
        const {lectureId} = req.params
        const result = await db.query(POST_LECTURE_NOTE,
            [noteText, studentId, lectureId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// gets thread list by course id and lecture id
courseRouter.get("/:courseId/qna", async (req, res, next) => {
    const {instructorId, studentId} = req
    try {
        const {courseId} = req.params
        const result = await db.query(GET_QNA_THREADS, [courseId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// create a new thread
courseRouter.post("/:courseId/qna", async (req, res, next) => {
    // const {instructorId, studentId} = req
    try {
        const {courseId} = req.params
        const [qna,] = await db.query(`SELECT qna_id
                                       FROM course
                                                join qna q on course.course_id = ? AND course.course_id = q.course_id`, [courseId])
        const {studentId, postText} = req.body
        const result = await db.query(POST_QNA_THREAD, [postText, studentId, qna.qna_id])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// gets all thread related data, entries etc.
courseRouter.get("/:courseId/qna/:threadId", async (req, res, next) => {
    const {courseId, threadId} = req.params
    try {

        console.log(courseId, threadId)
        const thread = await db.query(GET_QNA_THREADS, [courseId])
        const entries = await db.query(GET_COURSE_QNA_THREAD_ENTRIES, [threadId])
        res.json({thread, entries})
    } catch (exception) {
        next(exception)
    }
})

// creates a new thread post (posts an entry on a thread)
courseRouter.post("/:courseId/qna/:threadId", async (req, res, next) => {
    const {instructorId, studentId} = req
    try {
        const {courseId, threadId} = req.params
        const {studentId, entryText} = req.body
        const result = await db.query(POST_COURSE_QNA_THREAD_ENTRY, [entryText, threadId, studentId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// /:courseId/assignments GET, POST
courseRouter.get("/:courseId/assignments", async (req, res, next) => {
    try {
        const {courseId} = req.params
        const result = await db.query(GET_COURSE_ASSIGNMENTS_QUIZ, [courseId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

courseRouter.post("/:courseId/assignments/quizzes", async (req, res, next) => {
    try {
        //TODO: properly extract url parameters
        const {courseId} = req.params

        const quizName = req.body.quizName
        const weight = req.body.weight

        const result = await db.query(POST_COURSE_ASSIGNMENT_QUIZ1, [courseId, weight])
        const result2 = await db.query(POST_COURSE_ASSIGNMENT_QUIZ2, [result.insertId, quizName])

        const questions = req.body.assignment
        console.log(questions)

        for (let i = 0; i < questions.length; i++) {
            const {questionText, answer, answer1, answer2, answer3, answer4} = questions[i];
            const addQuestion = await db.query(POST_COURSE_ASSIGNMENT_QUIZ_QUESTION1, [result.insertId, questionText, answer])
            //res.json(addQuestion)
            //return;
            const {addOptions} = await db.query(POST_COURSE_ASSIGNMENT_QUIZ_QUESTION2,
                [addQuestion.insertId, answer1, addQuestion.insertId, answer2, addQuestion.insertId, answer3, addQuestion.insertId, answer4]);
        }

        res.json(result)
    } catch (exception) {
        next(exception)
    }
})

// /:courseId/assignments/:assignmentId GET, POST(submitting)
courseRouter.get("/:courseId/assignments/:assignmentId", async (req, res, next) => {
    const {studentId} = req
    try {
        const {assignmentId} = req.params
        const answers = await db.query(`SELECT q.question_id,
                                               assignment_id,
                                               score
                                        FROM quizquestion q
                                                 JOIN answers a on q.assignment_id = ? AND q.question_id = a.question_id
                                        WHERE a.student_id = ?`, [assignmentId, studentId])
        const score = answers.length === 0 ? 0 : answers.map(a => a.score).reduce((total, curr) => total + curr) / answers.length * 100
        const hasSubmitted = answers.length !== 0


        const result = await db.query(GET_COURSE_ASSIGNMENT_DETAILS, [assignmentId])
        const questions = []
        result.forEach(q => {
            if (!questions.map(q => q.questionId).includes(q.question_id)) {
                questions.push({
                    questionId: q.question_id,
                    questionText: q.question_text,
                    answer: '',
                    options: result.filter(r => r.question_id === q.question_id).map(f => f.question_option)
                })
            }
        })
        res.json({hasSubmitted, score, questions})
    } catch (exception) {
        next(exception)
    }
})

courseRouter.post("/:courseId/assignments/:assignmentId", async (req, res, next) => {

    // const {instructorId, studentId} = req
    const {studentId} = req.body
    try {
        let query = `
            INSERT
            INTO answers
            VALUES`;
        let params = [];

        const bodyArray = req.body.questions
        for (let i = 0; i < bodyArray.length; i++) {
            const {questionId, answer} = bodyArray[i];
            query += "(" + studentId + ", ?, 0, ?)";
            if (i < bodyArray.length - 1) {
                query += ", "
            } else {
                query += ";"
            }
            params.push(questionId);
            params.push(answer);
        }

        const {submitQuestion} = await db.query(query, params)
        res.json(submitQuestion)
    } catch (exception) {
        next(exception)
    }
})

// /:courseId/grading GET, POST(submitting)
courseRouter.get("/:courseId/submissions", async (req, res, next) => {
    try {

    } catch (exception) {
        next(exception)
    }
})

courseRouter.post("/:courseId/submissions", async (req, res, next) => {
    try {

    } catch (exception) {
        next(exception)
    }
})

module.exports = courseRouter
