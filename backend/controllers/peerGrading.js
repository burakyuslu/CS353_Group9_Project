const peerGradingRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');


peerGradingRouter.post('/', async (request, response) => {
    const body = request.body
    const student_id = body.student_id
    const assignment_id = body.assignment_id
    const score = body.score

    const peerGrade = await db.query(`SELECT *
                                      FROM Submits
                                               LEFT OUTER JOIN PeerGrades P using (assignment_id)
                                      GROUP BY submission_id
                                      HAVING count(review_id) < 3
    LIMIT 10;
    INSERT INTO PeerGrades(student_id, assignment_id, score, review_date)
    VALUES (?, ?, ?, SYSDATE());`, [student_id, assignment_id, score]);

    const result = helper.emptyOrRows(peerGrade);
    response.json(result)
})

module.exports = peerGradingRouter
