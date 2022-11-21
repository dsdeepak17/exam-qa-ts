import React from "react";
import Questions from "../../Data/questions.json";
import { QuizContext } from "../../Context/QuizContext";
import { QuestionType } from "../../helpers/Constants";

import Question from "./Question";
import Answer from "./Answer";
import Button from "../Button";

export interface IAnswer {
	answerRadio?: string;
	answerCheckbox?: string[];
	answerDate?: string;
	answerText?: string;
}

function QuestionWithAnswer() {
	const { currentQuestion, setCurrentQuestion, answers, setAnswers } = React.useContext(QuizContext);
	const [quizEnd, setQuizEnd] = React.useState(false);
	const [answer, setAnswer] = React.useState<IAnswer>({ answerRadio: "", answerCheckbox: [], answerDate: "", answerText: "" });
	const qtype: string = Questions.questions[currentQuestion - 1].questiontype;

	const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { value } = e.target;
		console.log(value);
		if (qtype === QuestionType.RADIO) {
			setAnswer({ answerRadio: value });
		}
		if (qtype === QuestionType.CHECKBOX) {
			if (answer.answerCheckbox?.includes(value)) {
				const newAnswer = answer.answerCheckbox.filter((i) => i !== value);
				setAnswer({ answerCheckbox: newAnswer });
			} else {
				const newAnswer = answer?.answerCheckbox ? [...answer.answerCheckbox, value] : [value];
				setAnswer({ answerCheckbox: newAnswer });
			}
		}
		if (qtype === QuestionType.DATE) {
			setAnswer({ answerDate: value });
		}
		if (qtype === QuestionType.TEXTAREA) {
			setAnswer({ answerText: value });
		}
	};

	const handleQuestionNavigation = (que: string) => {
		if (que === "previous" && currentQuestion >= 1) {
			setCurrentQuestion!(currentQuestion - 1);
			let newAnswers;
			if (answers.length >= currentQuestion) {
				newAnswers = [...answers];
				newAnswers.splice(currentQuestion - 1, 1, { key: currentQuestion, value: answer });
			} else {
				newAnswers = [...answers, { key: currentQuestion, value: answer }];
			}
			setAnswers!(newAnswers);
		}
		if (que === "next" && currentQuestion < Questions.questions.length) {
			let newAnswers;
			if (answers.length >= currentQuestion) {
				newAnswers = [...answers];
				newAnswers.splice(currentQuestion - 1, 1, { key: currentQuestion, value: answer });
			} else {
				newAnswers = [...answers, { key: currentQuestion, value: answer }];
			}
			setAnswers!(newAnswers);
			setCurrentQuestion!(currentQuestion + 1);
		}
	};

	const finalSubmit = () => {
		const newAnswers = [...answers, { key: currentQuestion, value: answer }];
		setAnswers!(newAnswers);
		setQuizEnd(true);
	};

	return (
		<>
			{!quizEnd ? (
				<div className="quiz-container">
					{currentQuestion >= 1 && currentQuestion < Questions.questions.length + 1 && (
						<>
							<div className="navigation-btn">
								{currentQuestion > 1 && <Button text="Previous" onClick={() => handleQuestionNavigation("previous")} />}
								{currentQuestion !== Questions.questions.length && <Button text="Next" onClick={() => handleQuestionNavigation("next")} />}
							</div>
							<span>{`Question ${currentQuestion} of ${Questions.questions.length}`}</span>
							<Question text={Questions.questions[currentQuestion - 1].question} />
							<Answer answer={answer} onAnswerChange={onAnswerChange} />
							<div className="final-submit">{currentQuestion === Questions.questions.length && <Button onClick={finalSubmit} />}</div>
						</>
					)}
				</div>
			) : (
				<pre>{JSON.stringify(answers, null, 2)}</pre>
			)}
		</>
	);
}

export default QuestionWithAnswer;
