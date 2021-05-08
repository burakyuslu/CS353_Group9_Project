const refundCourseRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../../utils/helper');
const db = require('../../services/db');
const {isEmpty} = require('lodash');

refundCourseRouter.get('/listCourses', async (request, response) => {
    const student_id = request.query.student_id

    if (isEmpty(student_id)) {
        response.status(400).json({error: "You must supply student_id"})
    }

    const listCourses = await db.query(`
        SELECT *
        FROM Buys
                 NATURAL JOIN Student
        WHERE student_id = ?;`, [student_id]);

    const result = helper.emptyOrRows(listCourses);
    response.json(result)
})

refundCourseRouter.get('/selectCourseToReturn', async (request, response) => {
    const request_id = request.query.request_id
    const student_id = request.query.student_id
    const admin_id = request.query.admin_id
    const course_id = request.query.course_id

    if (isEmpty(request_id) || isEmpty(student_id) || isEmpty(admin_id) || isEmpty(course_id)) {
        response.status(400).json({error: "You must supply request_id, student_id, admin_id, course_id"})
    }

    //choose the course to be returned and pass its information to the qquery

    const selectReturn = await db.query(`
        INSERT INTO RequestRefund(request_id, student_id, admin_id, course_id)
        VALUES (?, ?, ?, ?);
    `, [request_id, student_id, admin_id, course_id]);

    const result = helper.emptyOrRows(selectReturn);
    response.json(result)
})

refundCourseRouter.post('/specifyReason', async (request, response) => {
    const body = request.body

    const specifyReason = await db.query(`
    `);

    const result = helper.emptyOrRows(specifyReason);
    response.json(result)
})

module.exports = refundCourseRouter
