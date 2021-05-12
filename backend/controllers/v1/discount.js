const discountRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../../utils/helper');
const db = require('../../services/db');
const {isEmpty} = require('lodash');

discountRouter.get('/listDiscountableCourses', async (request, response) => {
    const admin_id = request.query.admin_id

    if (isEmpty(admin_id)) {
        response.status(400).json({error: "You must supply admin_id"})
    }

    const listDiscountableCourses = await db.query(`SELECT * FROM Course;`)
    const result = helper.emptyOrRows(listDiscountableCourses);
    response.json(result)


})

discountRouter.post('/applyDiscount', async (request, response) => {
    const body = request.body
    const course_id = body.course_id
    //const discount_id = body.discount_id
    const admin_id = body.admin_id
    const percentage = body.percentage
    //const end_date = request.query.end_date

    if (isEmpty(course_id) || isEmpty(admin_id) || isEmpty(percentage)) {
        response.status(400).json({error: "You must supply course_id, discount_id, admin_id, and percentage"})
    }


    const applyDiscount = await db.query(`
        UPDATE Course SET percentage = ? WHERE course_id = ?;`, [percentage, course_id]);

    const result = helper.emptyOrRows(applyDiscount);
    response.json(result)
})

discountRouter.delete('/cancelDiscount', async (request, response) => {
    const discount_id = request.query.discount_id
    const course_id = body.course_id
    if (isEmpty(discount_id)) {
        response.status(400).json({error: "You must supply discount_id"})
    }

    const cancelDiscount = await db.query(`
        UPDATE Course SET percentage = ? WHERE course_id = ?;`, [0, course_id]);

    const result = helper.emptyOrRows(cancelDiscount);
    response.json(result)
})

module.exports = discountRouter
