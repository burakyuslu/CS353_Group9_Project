const usersRouter = require("express").Router()
const bcrypt = require('bcrypt')

const db = require("../services/db")
const {getOffset, emptyOrRows} = require("../utils/helper")
const {listPerPage} = require("../utils/config")
//
// ...
//
// add course to wishlist
// courseRouter.post("/wishes", async (req, res) => {
// })

// /:userId/courses get courses bought by student or created by instructor, (completion rates too)
usersRouter.get("/courses", [async (req, res, next) => {
    const studentId = req
    try {
        const result = await db.query(`SELECT * FROM course NATURAL JOIN buys WHERE student_id = ?`, [studentId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])


// /:userId/wishes GET(get users' wishlist) POST(add course to wishlist
usersRouter.get("/wishes", [async (req, res, next) => {
    const {studentId} = req
    try {
        const result = await db.query(`SELECT *
                                            FROM course natural join addtowishlist
                                            WHERE student_id = ?`, [studentId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

usersRouter.post("/wishes", [async (req, res, next) => {
    const {studentId} = req
    const {courseId} = req.body
    try {
        const result = await db.query(`INSERT INTO addtowishlist
                                       VALUES(?, ?)`, [studentId, courseId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])


// /:userId/certificates
usersRouter.get("/certificates", [async (req, res, next) => {
    const {studentId} = req
    try {
        const result = await db.query(`SELECT *
                                       FROM certificate NATURAL JOIN earns
                                       WHERE student_id = ?`, [studentId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])


// /:userId/certificates/:courseId
usersRouter.get("/certificates/:courseId", [async (req, res, next) => {
    const {studentId} = req
    try {
        const {courseId} = req.params
        const result = await db.query(`SELECT *
                                       FROM certificate C NATURAL JOIN earns E
                                       WHERE student_id = ? AND course_id = ?`, [studentId, courseId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

// /complaints GET ?adminId=, POST post a new complaint, PUT(resolve) ?complaintId=
usersRouter.get("/complaints/:adminId", [async (req, res, next) => {
    try {
        const {adminId} = req.params
        const result = await db.query(`SELECT * FROM complains WHERE admin_id = ?`, [adminId])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])

usersRouter.post("/complaints", [async (req, res, next) => {
    try {
        const {instructorId, studentId} = req
        const {courseId, reason, price, category, certificationText} = req.body
        const adminId = await db.query(`SELECT admin_id FROM siteadmin ORDER BY RAND() LIMIT 1`)
        const result = await db.query(`INSERT INTO complains(admin_id ,student_id, course_id, reason, complain_date, resolved)
                                       VALUES(?, ?, ?, ?, SYSDATE(), 0)`, [adminId, studentId, courseId, reason])
        res.json(result)
    } catch (exception) {
        next(exception)
    }
}])
//

// /:userId/notifications get notifications of the user



module.exports = usersRouter
