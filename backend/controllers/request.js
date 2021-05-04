const requestRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');
const {isEmpty} = require('lodash');

requestRouter.get('/listRefundRequests', async (request, response) => {
    const admin_id = request.query.admin_id

    if (isEmpty(admin_id)) {
        response.status(400).json({error: "You must supply admin_id"})
    }

    const listRefundsRequests = await db.query(`
        SELECT *
        FROM RequestRefund
                 NATURAL JOIN SiteAdmin
        WHERE admin_id = ?;`, [admin_id]);

    const result = helper.emptyOrRows(listRefundsRequests);
    response.json(result)
})

requestRouter.delete('/resolveRequest', async (request, response) => {
    const verdict = request.query.verdict //accept or reject
    const request_id = request.query.request_id
    const student_id = request.query.student_id
    const course_id = request.query.course_id
    console.log(typeof(verdict));

    if (isEmpty(request_id) || isEmpty(verdict)) {
        response.status(400).json({error: "You must supply request_id and verdict."})
    }

    if (verdict === "accept") {
        //blah blah blah give muneh back to student
        const refundFee = await db.query(
            `SELECT price
             FROM Buys
             WHERE student_id = ?
               AND course_id = ?;`, [student_id, course_id]);

        const refund = await db.query(`
            UPDATE UserAcc
            SET balance = balance + ? 
            WHERE user_id = ?;`, [refundFee, student_id]);
        console.log("\nPay the student back.\n")

    } else {
        //blah blah blah don't give muneh back to the student
        console.log("\nDo nothing, the refund request is rejected.\n")
    }

    //after getting the request id from the request's respective button
    const selectRefundRequest = await db.query(
        `DELETE
         FROM RequestRefund
         WHERE request_id = ?;`, [request_id]);

    const result = helper.emptyOrRows(selectRefundRequest);
    response.json(result)
})
// todo notification later.
module.exports = requestRouter
