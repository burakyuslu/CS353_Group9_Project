const notesOnLecturesRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');

notesOnLecturesRouter.post('/', async (request, response) => {
    const body = request.body
    const student_id = body.student_id
    const lecture_id = body.lecture_id
    const note_text = body.note_text

    const rows = await db.query(`INSERT INTO CreatesNote(student_id, lecture_id, note_text, cdate)
    VALUES (?, ?, ?, SYSDATE());`, student_id, lecture_id, note_text);

    const data = helper.emptyOrRows(rows);
    response.json(data)
})

module.exports = notesOnLecturesRouter
