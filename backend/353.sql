#- User(user_id, name, surname, username, password, email_adress, balance, reg_date)

drop table if exists publish;
drop table if exists containsContent;
drop table if exists submits;
drop table if exists peergrades;
drop table if exists publish;
drop table if exists completes;
drop table if exists complains;
drop table if exists buys;
drop table if exists requestrefund;
drop table if exists discount;
drop table if exists askdiscount;
drop table if exists answers;
drop table if exists announcement;
drop table if exists addtowishlist;
drop table if exists entry;
drop table if exists thread;
drop table if exists textmaterial;
drop table if exists multimedia;
drop table if exists Content;
drop table if exists qna;
drop table if exists createsnote;
drop table if exists QuizAnswer;
drop table if exists QuizOption;
drop table if exists quizquestion;
drop table if exists Quiz;
drop table if exists project;
drop table if exists earns;
drop table if exists siteadmin;
drop table if exists Rates;
drop table if exists CourseKeyword;
drop table if exists Certificate;
drop table if exists assignmentmaterial;
drop table if exists CreatesNote;
drop table if exists lecture;
drop table if exists Course;
drop table if exists Instructor;
drop table if exists Student;
drop table if exists UserAcc;
drop table if exists a;

# DONE
# UserAcc(user_id, name, surname, username, password, email_address, balance, reg_date)
# C: user_id, username, email_address
CREATE TABLE UserAcc
(
    user_id       INT PRIMARY KEY AUTO_INCREMENT,
    name          VARCHAR(64)  NOT NULL,
    surname       VARCHAR(64)  NOT NULL,
    password      VARCHAR(64)  NOT NULL,
    email_address VARCHAR(256) NOT NULL UNIQUE,
    balance       INT          NOT NULL,
    reg_date      DATETIME     NOT NULL
) ENGINE = InnoDB;

INSERT INTO UserAcc (user_id, name, surname, password, email_address, balance, reg_date)
VALUES (1, 's1_name', 's1_surname', 's1_password', 'mail1', 1, '2020-01-01 10:10:10'),
       (2, 's2_name', 's2_surname', 's2_password', 'mail2', 2, '2020-02-02 11:11:11'),
       (3, 's3_name', 's3_surname', 's3_password', 'mail3', 3, '2020-03-03 12:12:12'),
       (4, 'i1_name', 'i1_surname', 'i1_password', 'mail4', 4, '2020-04-04 13:13:13'),
       (5, 'i2_name', 'i2_surname', 'i2_password', 'mail5', 5, '2020-05-05 14:14:14'),
       (6, 'i3_name', 'i3_surname', 'i3_password', 'mail6', 6, '2020-06-06 15:15:15');

# DONE
#Student(student_id)
# C: student_id
CREATE TABLE Student
(
    student_id INT PRIMARY KEY,
    FOREIGN KEY (student_id) REFERENCES UserAcc (user_id)
) ENGINE = InnoDB;

INSERT INTO Student (student_id)
VALUES (1),
       (2),
       (3);

# DONE
# Instructor(instructor_id)
# C: instructor_id
CREATE TABLE Instructor
(
    instructor_id INT PRIMARY KEY,
    FOREIGN KEY (instructor_id) REFERENCES UserAcc (user_id)
) ENGINE = InnoDB;

INSERT INTO Instructor (instructor_id)
VALUES (4),
       (5),
       (6);

# DONE
# Course(course_id, course_name, price, category, {keyword})
# C: course_id
CREATE TABLE Course
(
    course_id      INT PRIMARY KEY AUTO_INCREMENT,
    course_name    VARCHAR(256)  NOT NULL,
    course_summary VARCHAR(4096) NOT NULL,
    price          INT           NOT NULL,
    category       VARCHAR(64)   NOT NULL,
    discountable   BOOL          NOT NULL,
    percentage     TINYINT       NOT NULL
) ENGINE = InnoDB;

INSERT INTO Course (course_id, course_name, course_summary, price, category, discountable, percentage)
VALUES (1, 'c1_name', 'c1_summary', 10, 'c1_category', true, 30),
       (2, 'c2_name', 'c2_summary', 20, 'c2_category', false, 0),
       (3, 'c3_name', 'c3_summary', 30, 'c3_category', true, 50);

# DONE
# CourseKeyword(course_id, keyword)
# C: No candidate keys but rather compound key: (course_id, keyword)
CREATE TABLE CourseKeyword
(
    course_id INT,
    keyword   VARCHAR(128),
    PRIMARY KEY (course_id, keyword),
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
) ENGINE = InnoDB;

INSERT INTO CourseKeyword (course_id, keyword)
VALUES (1, 'c1_keyword'),
       (2, 'c2_keyword'),
       (3, 'c3_keyword');

# DONE
# Rates(course_id, student_id, comment, rating)
# C: No candidate keys but rather compound key: (course_id, student_id)
CREATE TABLE Rates
(
    course_id  INT     NOT NULL,
    student_id INT     NOT NULL,
    comment    VARCHAR(2048),
    rating     TINYINT NOT NULL,
    PRIMARY KEY (course_id, student_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id),
    FOREIGN KEY (student_id) REFERENCES Student (student_id)
) ENGINE = InnoDB;

INSERT INTO Rates (course_id, student_id, comment, rating)
VALUES (1, 1, 'comment1', 1),
       (2, 2, 'comment2', 2),
       (3, 3, 'comment3', 3);

# Done
# Certificate(certificate_id, certification_text, course_id)
# C: certificate_id, course_id
CREATE TABLE Certificate
(
    certificate_id     INT PRIMARY KEY AUTO_INCREMENT,
    certification_text VARCHAR(1000) NOT NULL,
    course_id          INT           NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
) ENGINE = InnoDB;

INSERT INTO Certificate (certificate_id, certification_text, course_id)
VALUES (1, 'cert_text_1', 1),
       (2, 'cert_text_2', 2),
       (3, 'cert_text_3', 3);

# DONE
# Earns(student_id, certificate_id, final_grade, date)
# C: No candidate keys but rather compound key: (student_id, certificate_id)
CREATE TABLE Earns
(
    student_id     INT,
    certificate_id INT,
    final_grade    TINYINT  NOT NULL,
    cdate          DATETIME NOT NULL,
    PRIMARY KEY (student_id, certificate_id)
) ENGINE = InnoDB;

INSERT INTO Earns
VALUES (1, 1, 1, '2020-01-01 10:10:10'),
       (2, 2, 2, '2020-02-02 1:1:1'),
       (3, 3, 3, '2020-03-03 2:2:2');

# Done
# SiteAdmin(admin_id, admin_username, admin_password)
# C: admin_id, admin_username
create table SiteAdmin
(
    admin_id       INT PRIMARY KEY AUTO_INCREMENT,
    admin_username VARCHAR(128) NOT NULL UNIQUE,
    admin_password VARCHAR(256) NOT NULL
) ENGINE = InnoDB;

INSERT INTO SiteAdmin(admin_id, admin_username, admin_password)
VALUES (1, 'admin_username_1', 'admin_password_1'),
       (2, 'admin_username_2', 'admin_password_2'),
       (3, 'admin_username_3', 'admin_password_3');

# Done
# AssignmentMaterial(assignment_id, course_id, weight)
# C: assignment_id
CREATE TABLE AssignmentMaterial
(
    assignment_id INT PRIMARY KEY AUTO_INCREMENT,
    course_id     INT NOT NULL,
    weight        INT NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
) ENGINE = InnoDB;

INSERT INTO AssignmentMaterial(assignment_id, course_id, weight)
VALUES (1, 1, 1),
       (2, 2, 1),
       (3, 3, 1);

#
# Project(assignment_id, title, prompt)
# C: assignment_id
CREATE TABLE Project
(
    assignment_id INT PRIMARY KEY,
    title         VARCHAR(256)  NOT NULL,
    prompt        VARCHAR(8096) NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES AssignmentMaterial (assignment_id)
) ENGINE = InnoDB;

INSERT INTO Project(assignment_id, title, prompt)
VALUES (1, 'project_title_1', 'prompt1'),
       (2, 'project_title_2', 'prompt2'),
       (3, 'project_title_3', 'prompt3');

# DONE
# Quiz(quiz_id, quiz_name)
# C: quiz_id
CREATE TABLE Quiz
(
    quiz_id   INT PRIMARY KEY,
    quiz_name VARCHAR(256) NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES AssignmentMaterial (assignment_id)
) ENGINE = InnoDB;

INSERT INTO Quiz(quiz_id, quiz_name)
VALUES (1, 'quiz_name_1'),
       (2, 'quiz_name_2'),
       (3, 'quiz_name_3');

# DONE
# QuizQuestion(assignment_id, question_text, {answer}, {option})
# C: question_id
CREATE TABLE QuizQuestion
(
    question_id     INT PRIMARY KEY AUTO_INCREMENT,
    assignment_id   INT          NOT NULL,
    question_text   VARCHAR(512) NOT NULL,
    question_answer VARCHAR(512) NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES Quiz (quiz_id)
) ENGINE = InnoDB;

INSERT INTO QuizQuestion(question_id, assignment_id, question_text, question_answer)
VALUES (1, 1, 'question_text_1', 'answer'),
       (2, 2, 'question_text_2', 'answer2'),
       (3, 2, 'question_text_3', 'answer3');

# DONE
# QuizOption(question_id, question_option)
# C: No candidate keys but rather compound key: (question_id, question_option)
CREATE TABLE QuizOption
(
    question_id     INT,
    question_option VARCHAR(512),
    PRIMARY KEY (question_id, question_option),
    FOREIGN KEY (question_id) REFERENCES QuizQuestion (question_id)
) ENGINE = InnoDB;

INSERT INTO QuizOption(question_id, question_option)
VALUES (1, 'question_option_1'),
       (2, 'question_option_2'),
       (3, 'question_option_3');

# DONE
# Lecture(lecture_id, lecture_name, course_id)
# C: lecture_id
CREATE TABLE Lecture
(
    lecture_id   INT PRIMARY KEY AUTO_INCREMENT,
    lecture_name VARCHAR(512) NOT NULL,
    course_id    INT          NOT NULL,
    content      TEXT         NOT NULL,
    type         VARCHAR(128) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
) ENGINE = InnoDB;

INSERT INTO Lecture(lecture_id, lecture_name, course_id, content, type)
VALUES (1, 'lecture_name_1', 1, 'content1', 'type1'),
       (2, 'lecture_name_2', 2, 'content2', 'type2'),
       (3, 'lecture_name_3', 3, 'content3', 'type3');

# DONE
# QnA(qna_id, course_id, lecture_id)
# C: qna_id
CREATE TABLE QnA
(
    qna_id     INT PRIMARY KEY AUTO_INCREMENT,
    course_id  INT NOT NULL,
    lecture_id INT,
    FOREIGN KEY (course_id) REFERENCES Course (course_id),
    FOREIGN KEY (lecture_id) REFERENCES Lecture (lecture_id)
) ENGINE = InnoDB;

INSERT INTO QnA (qna_id, course_id, lecture_id)
VALUES (1, 1, 1),
       (2, 2, 2),
       (3, 3, 3);

# DONE
# Thread(thread_id, post_text, user_id, qna_id)
# C : thread_id
CREATE TABLE Thread
(
    thread_id INT           NOT NULL PRIMARY KEY AUTO_INCREMENT,
    post_text VARCHAR(2048) NOT NULL,
    user_id   INT           NOT NULL,
    qna_id    INT           NOT NULL,
    FOREIGN KEY (user_id) REFERENCES UserAcc (user_id),
    FOREIGN KEY (qna_id) REFERENCES QnA (qna_id)
) ENGINE = InnoDB;

INSERT INTO Thread(thread_id, post_text, user_id, qna_id)
VALUES (1, 'post_text_1', 1, 1),
       (2, 'post_text_2', 2, 2),
       (3, 'post_text_3', 3, 3);

# DONE
# Entry(entry_id, entry_text, user_id, thread_id)
# C: entry_id
CREATE TABLE Entry
(
    entry_id   INT PRIMARY KEY AUTO_INCREMENT,
    entry_text VARCHAR(2048) NOT NULL,
    thread_id  INT           NOT NULL,
    user_id    INT           NOT NULL,
    FOREIGN KEY (user_id) REFERENCES UserAcc (user_id),
    FOREIGN KEY (thread_id) REFERENCES Thread (thread_id)
) ENGINE = InnoDB;

INSERT INTO Entry(entry_id, entry_text, thread_id, user_id)
VALUES (1, 'entry_text_1', 1, 1),
       (2, 'entry_text_2', 2, 2),
       (3, 'entry_text_3', 3, 3);

# INSERT INTO Complains (id, admin_id, student_id, course_id, reason, complain_date, resolved)
# VALUES (1, 1, 1, 1, 'hi', '2020-01-01 1:1:1', false),
#        (2, 2, 2, 2, 'hi', '2020-02-02 22:22:22', true),
#        (3, 3, 3, 3, 'hi', '2020-03-03 23:23:23', false);


# DONE
# Buys(student_id, course_id, price, buy_date)
# No candidate key but rather compound key (student_id, course_id)
CREATE TABLE Buys
(
    student_id INT,
    course_id  INT,
    price      DOUBLE   NOT NULL,
    buy_date   DATETIME NOT NULL,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Student (student_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
) ENGINE = InnoDB;

INSERT INTO Buys (student_id, course_id, price, buy_date)
VALUES (1, 1, 1, '2020-01-01 1:1:1'),
       (2, 2, 22, '2020-02-02 22:22:22'),
       (3, 3, 33, '2020-03-03 23:23:23');

# DONE
# RequestRefund(request_id, student_id, admin_id, course_id)
# C: request_id
CREATE TABLE RequestRefund
(
    request_id    INT PRIMARY KEY AUTO_INCREMENT,
    student_id    INT          NOT NULL,
    admin_id      INT          NOT NULL,
    course_id     INT          NOT NULL,
    reason        VARCHAR(512) NOT NULL,
    complain_date DATETIME     NOT NULL,
    resolved      BOOL         NOT NULL,
    is_read       BOOL         NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student (student_id),
    FOREIGN KEY (admin_id) REFERENCES SiteAdmin (admin_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
) ENGINE = InnoDB;

 INSERT INTO RequestRefund(request_id, student_id, admin_id, course_id, reason, complain_date, resolved, is_read)
 VALUES (1, 1, 1, 1, 'course is bad', '2020-01-01 1:1:1', false, true);
#        (2, 2, 2, 2),
#        (3, 3, 3, 3);


# DONE
# (student_id, lecture_id)
# No candidate key but rather compound key (student_id, lecture_id)
CREATE TABLE Completes
(
    student_id INT,
    lecture_id INT,
    PRIMARY KEY (student_id, lecture_id),
    FOREIGN KEY (student_id) REFERENCES Student (student_id),
    FOREIGN KEY (lecture_id) REFERENCES Lecture (lecture_id)
) ENGINE = InnoDB;

INSERT INTO Completes (student_id, lecture_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);


# DONE
# AddToWishlist(student_id, course_id, date)
# No candidate key but rather compound key (student_id, lecture_id)
CREATE TABLE AddToWishlist
(
    student_id INT,
    course_id  INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Student (student_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
) ENGINE = InnoDB;

INSERT INTO AddToWishlist (student_id, course_id)
VALUES (1, 1),
       (2, 2),
       (3, 3);


-- # DONE
-- # AskDiscount(instructor_id, admin_id, percentage, date)
-- # C: discount_id
-- CREATE TABLE AskDiscount
-- (
--     discount_id   INT PRIMARY KEY AUTO_INCREMENT,
--     admin_id      INT     NOT NULL,
--     course_id     INT     NOT NULL,
--     instructor_id INT     NOT NULL,
--     percentage    TINYINT NOT NULL,
--     FOREIGN KEY (admin_id) REFERENCES SiteAdmin (admin_id),
--     FOREIGN KEY (course_id) REFERENCES Course (course_id),
--     FOREIGN KEY (instructor_id) REFERENCES Instructor (instructor_id)
-- ) ENGINE = InnoDB;

-- INSERT INTO AskDiscount (discount_id, admin_id, course_id, instructor_id, percentage)
-- VALUES (1, 1, 1, 4, 11),
--        (2, 2, 2, 5, 22),
--        (3, 3, 3, 6, 33);


# DONE
# Publish(instructor_id, course_id, date)
# C: course_id
CREATE TABLE Publish
(
    course_id     INT PRIMARY KEY,
    instructor_id INT      NOT NULL,
    publish_date  DATETIME NOT NULL,
    FOREIGN KEY (course_id) REFERENCES Course (course_id),
    FOREIGN KEY (instructor_id) REFERENCES Instructor (instructor_id)
) ENGINE = InnoDB;

INSERT INTO Publish (instructor_id, course_id, publish_date)
VALUES (4, 1, '2020-01-01 1:1:1'),
       (5, 2, '2020-02-02 2:2:2'),
       (6, 3, '2020-03-03 3:3:3');


# Answers(student_id, quiz_id)
# No candidate key but rather compound key (student_id, question_id
CREATE TABLE Answers
(
    student_id  INT,
    question_id INT,
    score       INT,
    answer      VARCHAR(512) NOT NULL,
    PRIMARY KEY (student_id, question_id),
    FOREIGN KEY (student_id) REFERENCES Student (student_id),
    FOREIGN KEY (question_id) REFERENCES QuizQuestion (question_id)
) ENGINE = InnoDB;

INSERT INTO Answers (student_id, question_id, score, answer)
VALUES (1, 2, 1, 'a'),
       (1, 3, 1, 'a'),
       (2, 1, 1, 'a'),
       (2, 3, 1, 'a'),
       (2, 2, 1, 'a'),
       (3, 1, 1, 'a');


#DONE
# Announcement(instructor_id, course_id, ann_text)
# No candidate key but rather compound key (instructor_id, course_id, ann_date)
CREATE TABLE Announcement
(
    instructor_id INT,
    course_id     INT,
    ann_date      DATETIME      NOT NULL,
    ann_text      VARCHAR(4096) NOT NULL,
    PRIMARY KEY (instructor_id, course_id, ann_date),
    FOREIGN KEY (instructor_id) REFERENCES Instructor (instructor_id),
    FOREIGN KEY (course_id) REFERENCES Course (course_id)
) ENGINE = InnoDB;

INSERT INTO Announcement(instructor_id, course_id, ann_date, ann_text)
VALUES (4, 1, '2020-01-01 1:1:1', 'ann_text_1'),
       (5, 2, '2020-02-02 2:2:2', 'ann_text_2'),
       (6, 3, '2020-03-03 3:3:3', 'ann_text_3');

# DONE
# Submits(assignment_id, student_id, submission, avg_score)
# submission_id
CREATE TABLE Submits
(
    submission_id INT PRIMARY KEY AUTO_INCREMENT,
    assignment_id INT           NOT NULL,
    student_id    INT           NOT NULL,
    submission    VARCHAR(4096) NOT NULL,
    avg_score     DOUBLE,
    FOREIGN KEY (assignment_id) REFERENCES Project (assignment_id),
    FOREIGN KEY (student_id) REFERENCES Student (student_id)
) ENGINE = InnoDB;

INSERT INTO Submits (submission_id, assignment_id, student_id, submission, avg_score)
VALUES (1, 1, 1, 'submission1', 1.1),
       (2, 2, 2, 'submission2', 2.2),
       (3, 3, 3, 'submission3', 3.3);


# PeerGrades(assignment_id, student_id, score)
# review_id
CREATE TABLE PeerGrades
(
    review_id     INT PRIMARY KEY AUTO_INCREMENT,
    student_id    INT      NOT NULL,
    assignment_id INT      NOT NULL,
    score         INT      NOT NULL,
    review_date   DATETIME NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student (student_id),
    FOREIGN KEY (assignment_id) REFERENCES Project (assignment_id)
) ENGINE = InnoDB;

INSERT INTO PeerGrades(review_id, student_id, assignment_id, score, review_date)
VALUES (1, 1, 1, 100, '2020-01-01 11:11:11'),
       (2, 2, 2, 99, '2020-01-01 22:22:22'),
       (3, 3, 3, 98, '2020-01-01 23:23:23');

# DONE
# CreatesNote(student_id, lecture_id, note_text, date)
# note_id
CREATE TABLE CreatesNote
(
    note_id    INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT           NOT NULL,
    lecture_id INT           NOT NULL,
    note_text  VARCHAR(1024) NOT NULL,
    cdate      DATETIME      NOT NULL,
    FOREIGN KEY (student_id) REFERENCES Student (student_id),
    FOREIGN KEY (lecture_id) REFERENCES Lecture (lecture_id)
) ENGINE = InnoDB;

INSERT INTO CreatesNote(note_id, student_id, lecture_id, note_text, cdate)
VALUES (1, 1, 1, 'text 1', '2020-01-01 11:11:11'),
       (2, 2, 2, 'text 2', '2020-01-01 22:22:22'),
       (3, 3, 3, 'text 3', '2020-01-01 23:23:23');



