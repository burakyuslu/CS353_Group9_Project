const discountRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');
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

discountRouter.get('/applyDiscount', async (request, response) => {
    const course_id = request.query.course_id

    if (isEmpty(course_id)) {
        response.status(400).json({error: "You must supply course_id"})
    }

    /*
    const listAvailableCourses = await db.query(`
        INSERT INTO discount
            VALUES();

    const result = helper.emptyOrRows(applyDiscount);
    response.json(result)*/
})

discountRouter.get('/cancelDiscount', async (request, response) => {
    const discount_id = request.query.discount_id

    if (isEmpty(discount_id)) {
        response.status(400).json({error: "You must supply discount_id"})
    }

    const cancelDiscount = await db.query(`
        DELETE FROM discount WHERE discount_id = ?;`, [discount_id]);

    const result = helper.emptyOrRows(cancelDiscount);
    response.json(result)
})
