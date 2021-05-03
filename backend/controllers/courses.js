const bcrypt = require('bcrypt')
const coursesRouter = require('express').Router()

const helper = require('../utils/helper');
const db = require('../services/db')
const config = require('../utils/config');
const {getOffset} = require('../utils/helper')
const isEmpty = (elem) => elem === undefined || elem === null || elem.trim() === ""
coursesRouter.get('/', async (request, response) => {
    if (isEmpty(request.query.page)) {
        response.status(400).json({error: "You need to define page and limit parameters"})
    }
    const page = Number(request.query.page)

    const numberOfRows = await db.query(`SELECT COUNT(*) as rowCount
                                         FROM useracc`);
    const rowCount = numberOfRows[0].rowCount

    const maximumNumberOfPages = (rowCount / config.listPerPage)
    if (page < 1 && page > maximumNumberOfPages)
        response.status(400).json({error: `Page number must be between 1 and ${maximumNumberOfPages}`})

    const category = request.query.category
    const rating = request.query.rating
    const orderByPrice = request.query.orderByPrice.trim();
    const orderBy = isEmpty(orderByPrice) ? ""
        : orderByPrice.trim() === 'DESC'
            ? "ORDER BY C.price DESC"
            : orderByPrice.trim() === 'ASC'
                ? 'ORDER BY C.price ASC' : ""
    if (isNaN(Number(rating)))
        response.status(400).json({error: `Rating must be a number`})

    // console.log(`c: ${category}, r:${rating}, p:${page}, ${config.listPerPage}`)
    let rows
    if (isEmpty(category) && isEmpty(rating)) {
        rows = await db.query(`SELECT *
                               FROM Course ${orderBy}
                               LIMIT ?, ?`, [getOffset(page, config.listPerPage), config.listPerPage])

    } else if (isEmpty(category)) { // filtered with rating
        rows = await db.query(`SELECT *
                               FROM Course C
                               WHERE ? <= (SELECT avg(rating)
                                           FROM Rates R
                                           WHERE R.course_id = C.course_id) ${orderBy}
                               LIMIT ?, ?`,
            [Number(rating), getOffset(page, config.listPerPage), config.listPerPage])


    } else if (isEmpty(rating)) { // filtered with category
        rows = await db.query(`SELECT DISTINCT *
                               FROM Course C,
                                    CourseKeyword K
                               WHERE C.course_id = K.course_id
                                 AND K.keyword = ? ${orderBy}
                               LIMIT ?,?`,
            [category, getOffset(page, config.listPerPage), config.listPerPage])

    } else {
        rows = await db.query(`SELECT DISTINCT *
                               FROM Course C,
                                    CourseKeyword K
                               WHERE C.course_id = K.course_id
                                 AND K.keyword = ?
                                 AND ? <= (SELECT avg(rating)
                                           FROM Rates R
                                           WHERE R.course_id = C.course_id)
                                   ${orderBy}
                               LIMIT ?,?`,
            [category, Number(rating), getOffset(page, config.listPerPage), config.listPerPage])
    }
    const data = helper.emptyOrRows(rows);
    response.json(data)
    response.status(200)
})

coursesRouter.get("/view/:courseId", async (request, response) => {
    const courseId = request.params.courseId
    console.log(courseId)
    // todo if discount ended don't include
    const rows = await db.query(`
        SELECT DISTINCT *,
                        (SELECT percentage
                         FROM Course CJ
                                  LEFT OUTER JOIN Discount DJ using (course_id)
                         WHERE SYSDATE() < DJ.end_date
                         LIMIT 1) as discount_percentage
        FROM Course C,
             UserAcc U,
             Publish P,
             (SELECT avg(rating) as avg_rating
              FROM Course CI,
                   Rates Ra
              WHERE CI.course_id = Ra.course_id) R
        WHERE C.course_id = ?
          AND P.course_id = C.course_id
          AND U.user_id = P.instructor_id `, [Number(courseId)]
    )

    const data = helper.emptyOrRows(rows)
    response.json(data)
})

coursesRouter.get('/rating/:courseId', async (request, response) => {
    const courseId = request.params.courseId
    if (isEmpty(course_id))
        response.status(400).json({error: "You must supply course_id, student_id, and lecture_id"})

    const ratings = await db.query(
        `
            SELECT *
            FROM Rates R
            WHERE R.course_id = ?
        `, [cour])
    const data = helper.emptyOrRows(rows)
    response.json(data)
})


coursesRouter.post("/add", async (request, response) => {
    const body = request.body
    const studentId = body.student_id
    const courseId = body.course_id
    if (isEmpty(studentId) || isEmpty(courseId)) {
        response.status(400).json({error: `You must supply student_id and course_id`})
    }
    const rows = await db.query(`INSERT INTO AddToWishlist(student_id, course_id)
                                 VALUES (?, ?)`, [studentId, courseId]);

})


coursesRouter.post('/commentAndRate', async (request, response) => {
    const body = request.body
    const course_id = body.course_id
    const student_id = body.student_id
    const comment = body.comment
    const rating = body.rating

    if (isEmpty(course_id) || isEmpty(student_id) || isEmpty(comment) || isEmpty(rating))
        response.status(400).json({error: "You must supply course_id, student_id, comment and rating"})

    try {
        const commentAndRate = await db.query(`INSERT INTO Rates(course_id, student_id, comment, rating)
                                           VALUES (?, ?, ?, ?);
    `, [course_id, student_id, comment, rating]);

        const result = helper.emptyOrRows(commentAndRate);
        response.json(result)
    } catch (err) {
        response.status(400).json({"error": err.message})
    }

})

coursesRouter.get('/certificates', async (request, response) => {
    const body = request.body
    const student_id = body.student_id
    const rows = await db.query(`SELECT *
                                 FROM Earns E
                                 WHERE E.student_id = ?;
    `, [student_id]);

    const data = helper.emptyOrRows(rows);
    response.json(data)
})

module.exports = coursesRouter