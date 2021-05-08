const lectureRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../../utils/helper');
const db = require('../../services/db');

const isEmpty = (elem) => elem === undefined || elem === null || elem.trim() === ""

lectureRouter.get('/', async (request, response) => {
    const body = request.body
    const course_id = body.course_id
    const student_id = body.student_id
    const lecture_id = body.lecture_id
    if (isEmpty(course_id) || isEmpty(student_id) || isEmpty(lecture_id))
        response.status(400).json({error: "You must supply course_id, student_id, and lecture_id"})

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

lectureRouter.post('/note', async (request, response) => {
    const body = request.body
    const student_id = body.student_id
    const lecture_id = body.lecture_id
    const note_text = body.note_text

    if (isEmpty(student_id) || isEmpty(lecture_id) || isEmpty(note_text))
        response.status(400).json({error: "You must supply student_id, lecture_id and note text"})

    const notes = await db.query(`
        INSERT
        INTO CreatesNote(student_id, lecture_id, note_text, cdate)
        VALUES (?, ?, ?, SYSDATE());
    `, student_id, lecture_id, note_text);

    const result = helper.emptyOrRows(notes);
    response.json(result)
})

lectureRouter.post("/add", async (request, response) => {
    const body = request.body
    const {courseId, lectureType, lectureTitle, lectureContent} = body
    const lecture = await db.query(`INSERT INTO lecture(lecture_name, course_id)
                                    VALUES (?, ?)`, [lectureTitle, courseId])
    const content = await db.query(`INSERT INTO content(content_title)
                                    VALUES (?)`, [lectureContent])
})

module.exports = lectureRouter
