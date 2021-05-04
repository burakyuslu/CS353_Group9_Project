const requestRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');
const {isEmpty} = require('lodash');

requestRouter.get('/listRefundRequests', async (request, response) => {
    const student_id = request.query.student_id

    if (isEmpty(student_id)) {
        response.status(400).json({error: "You must supply student_id"})
    }

    const listRefundsRequests = await db.query(`
        SELECT *
        FROM RequestRefund
                 NATURAL JOIN Student 
        WHERE student_id = ?;`, [student_id]);

    const result = helper.emptyOrRows(listRefundsRequests);
    response.json(result)
})

module.exports = requestRouter
