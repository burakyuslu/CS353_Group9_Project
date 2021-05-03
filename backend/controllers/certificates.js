const certificates = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db')

certificates.get('/', async (request, response) => {
    const body = request.body
    const student_id = body.student_id
    const rows = await db.query(`SELECT *
    FROM Earns E
    WHERE E.student_id = ?;
    `, student_id);

    const data = helper.emptyOrRows(rows);
    response.json(data)
})

module.exports = certificates
