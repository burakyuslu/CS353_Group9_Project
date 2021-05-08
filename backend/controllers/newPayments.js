const paymentsRouter = require("express").Router()
const bcrypt = require('bcrypt')

const db = require("../services/db")
const {getOffset, emptyOrRows} = require("../utils/helper")
const {listPerPage} = require("../utils/config")
//
// ...
//
// add course to wishlist
// courseRouter.post("/:courseId/wish", async (req, res) => {
// })

// /:userId/courses get courses bought by student or created by instructor
// /:userId/notifications get notifications of the user


// /:userId/certificates
// /:userId/certificates/:courseId

// /complaints GET ?q, POST
module.exports = paymentsRouter
