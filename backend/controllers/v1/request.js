const requestRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../../utils/helper');
const db = require('../../services/db');
const {isEmpty} = require('lodash');

requestRouter.get('/listRefundRequests', async (request, response, next) => {
    const {adminId} = request
    try {

        const listRefundsRequests = await db.query(`
            SELECT *
            FROM RequestRefund
                     NATURAL JOIN SiteAdmin
            WHERE admin_id = ?;`, [adminId]);

        const result = helper.emptyOrRows(listRefundsRequests);
        response.json(result)
    } catch (exception) {
        next(exception)
    }
})

requestRouter.delete('/resolveRequest', async (request, response, next) => {
    const verdict = request.query.verdict //accept or reject
    const request_id = request.query.request_id
    const student_id = request.query.student_id
    const course_id = request.query.course_id
    console.log(typeof (verdict));

    try {
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
                WHERE user_id = ?;`, [refundFee[0].price, student_id]);
            console.log("\nPay the student back.\n")
            const removeCourse = await db.query(
                `DELETE
                 FROM Buys
                 WHERE student_id = ?
                   AND course_id = ?;`, [student_id, course_id]);

            const resolveRequest = await db.query(`UPDATE requestrefund SET resolved = 1 WHERE request_id = ?;`, [request_id])

        } else {
            console.log("\nDo nothing, the refund request is rejected.\n")
        }

        //after getting the request id from the request's respective button
        const selectRefundRequest = await db.query(
            `DELETE
             FROM RequestRefund
             WHERE request_id = ?;`, [request_id]);

        const result = helper.emptyOrRows(selectRefundRequest);
        response.json(result)

    } catch (e) {
        next(e)
    }

})
// todo notification later.
module.exports = requestRouter
