const paymentsRouter = require("express").Router()
const bcrypt = require('bcrypt')

const db = require("../services/db")
const {getOffset, emptyOrRows} = require("../utils/helper")
const {listPerPage} = require("../utils/config")

const {GET_COURSE} = require("./sql/courses");
//
// ...
//
// add course to wishlist
// courseRouter.post("/:courseId/wish", async (req, res) => {
// })

// /:userId/courses get courses bought by student or created by instructor
// /:userId/notifications get notifications of the user


// /:userId/certificates
// /:userId/certificates/:courseId

paymentsRouter.post('/checkouts', async (req, res, next) => {
    try {
        // const {noteText} = req.body
        const {studentId} = req
        const {courseId} = req.body
        const [profileData,] = await db.query('SELECT user_id, name, surname, email_address, balance, reg_date FROM useracc u where user_id = ?', [studentId])

        const [course,] = await db.query(GET_COURSE, [courseId])
        const price = course.discountable && course.percentage > 0 ?
            course.price * ((100 - (course.percentage)) / 100) : course.price
        if (profileData.balance < price) {
            res.status(401).json({error: "Balance is not enough."})
        } else {
            const result = await db.query(`INSERT INTO buys(student_id, course_id, price, buy_date)
                                        VALUES (?, ?, ?, SYSDATE());`, [studentId, courseId, price])
            const balance = await db.query(`UPDATE useracc
                                            SET balance = ?
                                            WHERE user_id = ?;`, [profileData.balance - price, studentId])
            const balance2 = await db.query(`UPDATE useracc
                                            SET balance = ?
                                            WHERE user_id = ?;`, [profileData.balance + price, course.user_id])
            res.json(result)
        }
        // todo remove from wihslisht
    } catch (exception) {
        next(exception)
    }
})
// /complaints GET ?q, POST
module.exports = paymentsRouter
