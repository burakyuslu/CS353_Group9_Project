const quizRouter = require('express').Router()
const bcrypt = require('bcrypt')

const helper = require('../utils/helper');
const db = require('../services/db');

// this part contains most likely various errors, logic may be wrong for creating questions especially
// maybe convert adding questions to adding questions to an array of questions, then sending that...
// todo fix

// create a quiz by instructor user
quizRouter.post('/', async(request, response) => {
    const body = request.body

    const weight = body.weight;
    const course_id = body.course_id;

    const assignment_id = body.assignment_id; // todo check assignment id is indeed taken like this
    const quiz_name = body.quiz_name;

    // create assignment material and create quiz
    const quiz = await db.query(`INSERT INTO AssignmentMaterial (course_id, weight) VALUES ( ?, ?); INSERT INTO Quiz (quiz_id, quiz_name) VALUES (?, ?);`,
        [course_id, weight, assignment_id, quiz_name]);

    const result = helper.emptyOrRows(quiz);
    response.json(result)
})

// create a question for a quiz by instructor user
quizRouter.post('/', async(request, response) => {
    const body = request.body

    const question_id = body.question_id;
    const assignment_id = body.assignment_id;
    const text = body.text;
    const radio_button_text = body.radio_button_text;

    const option_1_text = body.option_1_text;
    const option_2_text = body.option_2_text;
    const option_3_text = body.option_3_text;
    const option_4_text = body.option_4_text;

    // create a question and create the options for it
    const question = await db.query('INSERT INTO QuizQuestion(question_id, assignment_id, question_text, question_answer) VALUES (?, ?, ?, ?); INSERT INTO QuizOption(question_id, question_option) VALUES ( ?, ?), ( ?, ?), ( ?, ?), ( ?, ?);',
        question_id, assignment_id, text, radio_button_text, question_id, option_1_text, question_id, option_2_text, question_id, option_3_text, question_id, option_4_text);

    const result = helper.emptyOrRows(question);
    response.json(result)
})

// solve quiz for student user
quizRouter.post('/', async(request, response) => {
    const body = request.body

    const student_id = body.student_id;
    const question_id = body.question_id;
    const score = body.score;
    const answer = body.answer;

    // create a question and create the options for it
    const quizSolution = await db.query('INSERT INTO Answers(student_id, question_id, score, answer) VALUES ( ?, ?, ?, ?);',
        student_id, question_id, score, answer);

    const result = helper.emptyOrRows(quizSolution);
    response.json(result)
})

// view quiz for student user
quizRouter.get('/', async(request, response) => {
    const body = request.body

    // const question_id = body.question_id;
    const assignment_id = body.assignment_id;

    // create a question and create the options for it
    // there might be something wrong with the sql here
    const quizResultView = await db.query('    SELECT sum(score) FROM Answers A, QuizQuestion Q WHERE A.question_id = Q.question_id AND Q.assignment_id = ?;',
        assignment_id); //todo assignment_id, is this correct?

    const result = helper.emptyOrRows(quizResultView);
    response.json(result)
})

module.exports = quizRouter