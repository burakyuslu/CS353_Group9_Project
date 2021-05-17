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

    console.log(user1)
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
            `SELECT s.admin_id as userId, s.admin_username as email, s.admin_password as password
             FROM siteadmin s
             WHERE 1 = 1
               AND s.admin_username = ?`,
            [email])
        // user1 = {
        //     password = 'admin_password_'
        // }
        console.log('here', user1)
    } else {
        return response.status(401).json({
            error: 'invalid type of user',
        })
    }

    // const passwordCorrect =
    //     user === undefined
    //         ? false
    //         : await bcrypt.compare(password, user.password)
    const passwordCorrect = user1 && user1.length > 0 && password === user.password  // todo remove this when signup is implemented
    const user = user1[0]
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
    const {isInstructor, name, surname, password, email} = request.body

    // let signup = undefined //needs to be fixed

    /*
        INSERT INTO Student(student_id)
        SELECT U.user_id
        FROM UserAcc U
        WHERE ? = U.name
          AND ? = U.password;*/

    const signup1 = await db.query(`INSERT INTO useracc (name, surname, password, email_address, balance, reg_date)
                                    VALUES (?, ?, ?, ?, 0, SYSDATE());
    `, [name, surname, password, email])

    if (!isInstructor) {
        const signup2 = await db.query(`INSERT INTO student
                                        VALUES (?)`, [signup1.insertId])
    } else {
        const signup2 = await db.query(`INSERT INTO instructor
                                        VALUES (?)`, [signup1.insertId])
    }
    /*else {
        return response.status(401).json({
            error: 'invalid type of user',
        })
    }*/

    response.status(200).json({message: "Succesfull"})

})
module.exports = authRouter
