const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../../utils/helper');
// const config = require('../utils/config');
const db = require('../../services/db')

usersRouter.get('/', async (request, response) => {
    const limit = request.params.limit
    const rows = await db.query(`SELECT *
                                 FROM useracc
                                 LIMIT ?,?`, [0, 10]);

    const data = helper.emptyOrRows(rows);
    response.json(data)
})


usersRouter.post('/', async (request, response) => {
    const body = request.body
    console.log(body.username)
    // response.json({"hello": "world"})
    // await db.query(
    //     `INSERT * FROM useracc LIMIT ? ?,?`, [body.username, body.password...]
    // );

})
// usersRouter.post('/', async (request, response) => {
//     const body = request.body
//     const password = body.password
//
//     if (!password || password.length < 3) {
//         return response.status(400).json({error: 'password length must be at least 3'})
//     }
//     const saltRounds = 10
//     const passwordHash = await bcrypt.hash(password, saltRounds)
//
//     const user = new User({
//         username: body.username,
//         name: body.name,
//         passwordHash: passwordHash,
//         blogs: [],
//     })
//
//     const savedUser = await user.save()
//     response.json(savedUser)
// })

module.exports = usersRouter
