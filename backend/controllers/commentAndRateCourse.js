const commentAndRateCourseRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');

commentAndRateCourseRouter.post('/', async (request, response) => {
    const body = request.body
    const course_id = body.course_id
    const student_id = body.student_id
    const comment = body.comment
    const rating = body.rating

    const rows = await db.query(`INSERT INTO Rates(course_id, student_id, comment, rating) VALUES (?, ?, ?, ?);
    `, course_id, student_id, comment, rating);

    const data = helper.emptyOrRows(rows);
    response.json(data)
})

module.exports = commentAndRateCourseRouter
