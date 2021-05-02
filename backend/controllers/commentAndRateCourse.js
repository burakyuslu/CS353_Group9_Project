const commentAndRateCourseRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');
const { isEmpty } = require('lodash');

commentAndRateCourseRouter.post('/', async (request, response) => {
    const body = request.body
    const course_id = body.course_id
    const student_id = body.student_id
    const comment = body.comment
    const rating = body.rating

    if (isEmpty(course_id) || isEmpty(student_id) || isEmpty(comment) || isEmpty(rating))
    response.status(400).json({error: "You must supply course_id, student_id, comment and rating"})


    const commentAndRate = await db.query(`INSERT INTO Rates(course_id, student_id, comment, rating) VALUES (?, ?, ?, ?);
    `, course_id, student_id, comment, rating);

    const result = helper.emptyOrRows(commentAndRate);
    response.json(result)
})

module.exports = commentAndRateCourseRouter
