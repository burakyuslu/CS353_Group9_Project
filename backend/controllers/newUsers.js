const usersRouter = require("express").Router()
const bcrypt = require('bcrypt')

const db = require("../services/db")
const {getOffset, emptyOrRows} = require("../utils/helper")
const {listPerPage} = require("../utils/config")
//
// ...
//
// add course to wishlist
// courseRouter.post("/wishes", async (req, res) => {
// })

// /:userId/courses get courses bought by student or created by instructor, (completion rates too)
// /:userId/wishes GET(get users' wishlist) POST(add course to wishlist
// /:userId/certificates
// /:userId/certificates/:courseId
// /complaints GET ?adminId=, POST post a new complaint, PUT(resolve) ?complaintId=
//

// /:userId/notifications get notifications of the user



module.exports = usersRouter
