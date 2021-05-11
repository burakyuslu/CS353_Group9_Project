CREATE TRIGGER calculate_score
    BEFORE INSERT
    ON answers
    FOR EACH ROW
BEGIN
    DECLARE answer VARCHAR(512);
    SET answer = (SELECT question_answer FROM quizquestion WHERE question_id = NEW.question_id);
    IF (NEW.answer = answer) THEN
        set new.score = 1;
#         UPDATE answers SET NEW.score = 1 WHERE;
    ELSE
        set new.score = 0;
#         UPDATE answers SET NEW.score = 0;
    END IF;
END;

INSERT INTO answers VALUES (1, 1, 0, 'answera')