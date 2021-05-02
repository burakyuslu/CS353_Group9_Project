const lectureRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');

lectureRouter.get('/', async (request, response) => {
    const body = request.body
    const course_id = body.course_id
    const student_id = body.student_id
    const lecture_id = body.lecture_id
    const rows = await db.query(`
    SELECT L.lecture_name
    FROM Lecture L
             LEFT OUTER JOIN Completes C
               ON (L.lecture_id = C.lecture_id 
    AND L.course_id = ?
    AND C.student_id = ?);
     
    SELECT *
    FROM Lecture L, CreatesNote C
    WHERE C.student_id = ?
        AND L.lecture_id =?
        AND L.lecture_id = C.lecture_id;
     
    SELECT DISTINCT *
    FROM Contains C, Multimedia M, TextMaterial T, Content LC
    WHERE C.lecture_id = ?
        AND C.content_id = LC.content_id
        AND (C.content_id = T.content_id
        OR  C.content_id = M.content_id);`, course_id, student_id, student_id, lecture_id, lecture_id );

    const data = helper.emptyOrRows(rows);
    response.json(data)
})

module.exports = lectureRouter
