const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const signupRouter = require('express').Router()
const db = require('../services/db')

signupRouter.post('/', async (request, response) => {
    const body = request.body

    //const user = await User.findOne({ username: body.username })
    const userType = body.userType
    const name = body.name
    const surname = body.surname
    const userName = body.username
    const userPassword = body.password
    const emailAddress = body.email


    let signup = undefined //needs to be fixed

    if (userType === "student") {
        signup = await db.query(`INSERT INTO UserAcc
                                 VALUES (?, ?, ?, ?, ?, 0, SYSDATE());
        INSERT INTO Student(student_id)
        SELECT U.user_id
        FROM UserAcc U
        WHERE ? = U.username
          AND ? = U.password;`, [name, surname, userName, userPassword, emailAddress, userName, userPassword])
    } else if (userType === "instructor") {
        signup = await db.query(`INSERT INTO UserAcc
                                 VALUES (?, ?, ?, ?, ?, 0, SYSDATE());
        INSERT INTO Instructor(instructor_id)
        SELECT U.user_id
        FROM UserAcc U
        WHERE ? = U.username
          AND ? = U.password;`, [name, surname, userName, userPassword, emailAddress, userName, userPassword])
    } else {
        return response.status(401).json({
            error: 'invalid type of user',
        })
    }

    response.status(200).send({token, username: user.username, user_id: user.user_id})

})
module.exports = signupRouter