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

requestRouter.delete( '/resolveRequest', async (request, response) => {
    const verdict = request.query.verdict
    const request_id = request.query.request_id

    if (isEmpty(request_id)) {
        response.status(400).json({error: "You must supply request_id"})
    }

    //after getting the request id from the request's respective button
    const selectRefundRequest = await db.query(
        `SELECT *
             FROM RequestRefund
             WHERE request_id = ?;`, [request_id]);

    const result = helper.emptyOrRows(selectRefundRequest);
    response.json(result)
})
// todo notification later.
module.exports = requestRouter
