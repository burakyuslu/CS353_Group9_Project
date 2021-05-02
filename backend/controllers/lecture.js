const lectureRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');

const isEmpty = (elem) => elem === undefined || elem === null || elem.trim() === ""

lectureRouter.get('/', async (request, response) => {
    const body = request.body
    const course_id = body.course_id
    const student_id = body.student_id
    const lecture_id = body.lecture_id
    if (isEmpty(course_id)) // todo add othersj
        response.status(400).json({error: "You must suplly course_id, student_id, and lecture_id"})
    const lectureVideos = await db.query(` SELECT L.lecture_name
                                           FROM Lecture L
                                                    LEFT OUTER JOIN Completes C
                                                                    ON (L.lecture_id = C.lecture_id
                                                                        AND L.course_id = ?
                                                                        AND C.student_id = ?)`, [course_id, student_id])


    const notes = await db.query(`SELECT *
                                  FROM Lecture L,
                                       CreatesNote C
                                  WHERE C.student_id = ?
                                    AND L.lecture_id = ?
                                    AND L.lecture_id = C.lecture_id;`, [student_id, lecture_id])

    const lectureMaterials = await db.query(` SELECT DISTINCT *
                                              FROM containscontent C,
                                                   Multimedia M,
                                                   TextMaterial T,
                                                   Content LC
                                              WHERE C.lecture_id = ?
                                                AND C.content_id = LC.content_id
                                                AND (C.content_id = T.content_id
                                                  OR C.content_id = M.content_id);`, [lecture_id]);

    const result = {
        lectureVideos: helper.emptyOrRows(lectureVideos),
        notes: helper.emptyOrRows(notes),
        lectureMaterials: helper.emptyOrRows(lectureMaterials)
    }
    response.json(result)
})

lectureRouter.get('/note')
module.exports = lectureRouter
