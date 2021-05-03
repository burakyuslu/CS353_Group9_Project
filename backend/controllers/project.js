const projectRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');

// create a project by instructor user
projectRouter.post('/', async(request, response) => {
    const body = request.body

    const weight = body.weight;
    const course_id = body.course_id;

    const assignment_id = body.assignment_id; // todo do we take the assignment_id when we execute first SQL or like this?
    const project_title = body.project_title;
    const project_prompt = body.project_prompt;

    // create assignment material and create project
    const project = await db.query('INSERT INTO AssignmentMaterial (course_id, weight) VALUES (?, ?); INSERT INTO Project(assignment_id, title, prompt) VALUES (?, ?, ?);',
        course_id, weight, assignment_id, project_title, project_prompt);


    const result = helper.emptyOrRows(project);
    response.json(result)
})

// submit a project file by a student user
projectRouter.post('/', async(request, response) => {
    const body = request.body
    const student_id = body.student_id
    const assignment_id = body.assignment_id
    const submission_text = body.submission_text;
    let avg_score = null; // todo calculation for avg_score + do we insert null or  variable initialized to null

    // get the details about a project and submit file
    const submission = await db.query('SELECT * FROM Project P, AssignmentMaterial A WHERE P.project_id = @project_id AND P.project_id = A.assignment_id; INSERT INTO Submits(assignment_id, student_id, submission, avg_score) VALUES (?, ?, ?, NULL);',
        assignment_id, student_id, submission_text);


    const result = helper.emptyOrRows(submission);
    response.json(result)
})

module.exports = projectRouter