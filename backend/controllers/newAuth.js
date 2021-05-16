const authRouter = require('express').Router()
const bcrypt = require('bcrypt')

const db = require('../services/db')
const jwt = require("jsonwebtoken");
const {getOffset, emptyOrRows} = require('../utils/helper')
const {listPerPage} = require('../utils/config')
//
// login
// signup
//

authRouter.post('/login', async (request, response) => {
    const {userType, email, password} = request.body
    let user1 = undefined

    if (userType === 'student') {
        user1 = await db.query(
            `SELECT user_id as userId, name, surname, email_address as email, balance as balance, password
             FROM UserAcc U,
                  Student S
             WHERE S.student_id = U.user_id
               AND ? = U.email_address`,
            [email])
    } else if (userType === 'instructor') {
        user1 = await db.query(
            `SELECT user_id as userId, name, surname, email_address as email, balance as balance, password
             FROM UserAcc U,
                  Instructor I
             WHERE I.instructor_id = U.user_id
               AND ? = U.email_address`, [email]
        )
    } else if (userType === 'admin') {
        user1 = await db.query(
            `SELECT admin_id as userId, admin_username as email, admin_password as password
             FROM SiteAdmin
             WHERE ? = admin_username`
                [email])
    } else {
        return response.status(401).json({
            error: 'invalid type of user',
        })
    }

    // const passwordCorrect =
    //     user === undefined
    //         ? false
    //         : await bcrypt.compare(password, user.password)
    const user = user1[0]
    const passwordCorrect = user1.length > 0 && password === user.password  // todo remove this when signup is implemented
    // console.log(password, user.password)
    // console.log(`${password}, ${user.password}`)
    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password',
        })
    }
    const userForToken = {
        userType: userType,
        userIdKey: `${userType}Id`,
        userId: `${user.userId}`,
    }

    // eslint-disable-next-line no-undef
    // console.log('hhey', user)
    const token = jwt.sign(userForToken, process.env.SECRET)
    // const decodedToken = jwt.verify(token, process.env.SECRET)
    // console.log('hehe', decodedToken)

    response
        .status(200)
        .send({
            token,
            userType: userType,
            email: user.email,
            userId: user.userId,
            name: user.name,
            surname: user.surname,
            balance: user.balance
        })
})

// todo signup
authRouter.post('/signup', async (request, response) => {
    // const body = request.body

    // const userType = body.userType
    // const name = body.name
    // const surname = body.surname
    // const userName = body.username
    // const userPassword = body.password
    // const emailAddress = body.email
    const {userType, name, surname, email, password} = request.body

    // let signup = undefined //needs to be fixed

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
module.exports = authRouter
