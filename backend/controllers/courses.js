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
                               FROM Course ${orderBy} LIMIT ?, ?`, [getOffset(page, config.listPerPage), config.listPerPage])

    } else if (isEmpty(category)) { // filtered with rating
        rows = await db.query(`SELECT *
                               FROM Course C
                               WHERE ? <= (SELECT avg(rating)
                                           FROM Rates R
                                           WHERE R.course_id = C.course_id) ${orderBy} LIMIT ?, ?`,
            [Number(rating), getOffset(page, config.listPerPage), config.listPerPage])


    } else if (isEmpty(rating)) { // filtered with category
        rows = await db.query(`SELECT DISTINCT *
                               FROM Course C,
                                    CourseKeyword K
                               WHERE C.course_id = K.course_id
                                 AND K.keyword = ? ${orderBy} LIMIT ?,?`,
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
                                   ${orderBy} LIMIT ?,?`,
            [category, Number(rating), getOffset(page, config.listPerPage), config.listPerPage])
    }
    const data = helper.emptyOrRows(rows);
    response.json(data)
    response.status(200)
})

module.exports = coursesRouter