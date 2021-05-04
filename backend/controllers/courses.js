const bcrypt = require('bcrypt')
const coursesRouter = require('express').Router()

const helper = require('../utils/helper');
const db = require('../services/db')
const config = require('../utils/config');
const {getOffset} = require('../utils/helper')
const isEmpty = (elem) => elem === undefined || elem === null || elem.trim() === ""

// todo wrap queries with try-catch clause.

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
    try {
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
    } catch
        (err) {
        response.status(400).json({error: err.message})
    }

    const data = helper.emptyOrRows(rows);
    response.json(data)
    response.status(200)
})

coursesRouter.get("/view/:courseId", async (request, response) => {
    const courseId = request.params.courseId
    console.log(courseId)
    // todo check later: if discount ended don't include
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

// todo check later: pagination?
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

coursesRouter.post("/buy", async (request, response) => {
    // todo implement this method with a clear mind. hard.
    // buying a course
    `INSERT INTO Buys(student_id, course_id, price, buy_date)
     VALUES (@student_id, @course_id, @price, SYSDATE());`

        `SELECT percentage
         FROM Course CJ
                  LEFT OUTER JOIN Discount DJ using (course_id)
         WHERE SYSDATE() < DJ.end_date
         LIMIT 1`
})


coursesRouter.post("/wishlist/add", async (request, response) => {
    const body = request.body
    const studentId = body.student_id
    const courseId = body.course_id
    if (isEmpty(studentId) || isEmpty(courseId)) {
        response.status(400).json({error: `You must supply student_id and course_id`})
    }
    const rows = await db.query(`INSERT INTO AddToWishlist(student_id, course_id)
                                 VALUES (?, ?)`, [studentId, courseId]);

})

coursesRouter.post("/wishlist/", async (request, response) => {
    const body = request.body
    const studentId = body.student_id
    if (isEmpty(studentId) || isEmpty(courseId)) {
        response.status(400).json({error: `You must supply student_id and course_id`})
    }
    const rows = await db.query(`INSERT INTO AddToWishlist(student_id, course_id)
                                 VALUES (?, ?)`, [studentId, courseId]);

})


coursesRouter.post('/rate', async (request, response) => {
    const body = request.body
    const course_id = body.course_id
    const student_id = body.student_id
    const comment = body.comment
    const rating = body.rating

    if (isEmpty(course_id) || isEmpty(student_id) || isEmpty(comment) || isEmpty(rating))
        response.status(400).json({error: "You must supply course_id, student_id, comment and rating"})

    try {
        const rate = await db.query(`INSERT INTO Rates(course_id, student_id, comment, rating)
                                     VALUES (?, ?, ?, ?);
        `, [course_id, student_id, comment, rating]);

        const result = helper.emptyOrRows(rate);
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

coursesRouter.post('/add', async (request, response) => {
    const body = request.body
    const title = body.title
    const summary = body.summary
    const price = body.price
    const category = body.category
    const keywords = body.keywords
    const instructorId = body.instructorId
    try {
        // todo check later: course publish table can be removed
        const course = await db.query(`INSERT INTO course(course_name, course_summary, price, category)
                                       VALUES (?, ?, ?, ?)`, [title, summary, price, category])

        // todo check later: may be causing a bug
        const publication = await db.query(`INSERT INTO publish(course_id, instructor_id, publish_date)
                                            VALUES (?, ?, SYSDATE())`, [course.insertId, instructorId])
        const keywords = keywords.map(async k => {
            return await db.query(`INSERT INTO coursekeyword(course_id, keyword)
                                   VALUES (?, ?)`, [course.insertId, k])
        })
        response.json({
            course: helper.emptyOrRows(course),
            publication: helper.emptyOrRows(publication),
            keywords: keywords.reduce((acc, keyword) => {
                return [...acc, helper.emptyOrRows(keyword)
                ]
            }, [])
        })
    } catch (err) {
        response.status(400).json({"error": err.message})
        // todo write response
    }
})

module.exports = coursesRouter