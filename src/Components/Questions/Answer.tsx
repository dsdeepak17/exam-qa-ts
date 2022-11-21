import React from "react";
import { QuestionType } from "../../helpers/Constants";

import Questions from "../../Data/questions.json";
import { QuizContext } from "../../Context/QuizContext";

// interface IAnswer {
// 	answerRadio?: string;
// 	answerCheckbox?: string[];
// 	answerDate?: string;
// 	answerText?: string;
// }

function Answer(props: any) {
	// const [answer, setAnswer] = React.useState<IAnswer>({ answerRadio: "", answerCheckbox: [], answerDate: "", answerText: "" });
	const { answer, onAnswerChange } = props;
	const { currentQuestion, answers } = React.useContext(QuizContext);
	const qtype: string = Questions.questions[currentQuestion - 1].questiontype;

	// const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	// 	const { value } = e.target;
	// 	console.log(value);
	// 	if (qtype === QuestionType.RADIO) {
	// 		setAnswer({ answerRadio: value });
	// 	}
	// 	if (qtype === QuestionType.CHECKBOX) {
	// 		if (answer.answerCheckbox?.includes(value)) {
	// 			const newAnswer = answer.answerCheckbox.filter((i) => i !== value);
	// 			setAnswer({ answerCheckbox: newAnswer });
	// 		} else {
	// 			const newAnswer = answer?.answerCheckbox ? [...answer.answerCheckbox, value] : [value];
	// 			setAnswer({ answerCheckbox: newAnswer });
	// 		}
	// 	}
	// 	if (qtype === QuestionType.DATE) {
	// 		setAnswer({ answerDate: value });
	// 	}
	// 	if (qtype === QuestionType.TEXTAREA) {
	// 		setAnswer({ answerText: value });
	// 	}
	// };

	// React.useEffect(() => {
	// 	console.log({ answers });
	// }, [answers]);

	if (qtype === QuestionType.RADIO) {
		return (
			<div className="answer-container">
				{Questions.questions[currentQuestion - 1].questionoption.map(({ optionid, optionvalue }) => {
					return (
						<div className="option-value" key={optionid.toString()}>
							<input type="radio" id={optionvalue} name={Questions.questions[currentQuestion - 1].question} value={optionvalue} onChange={onAnswerChange} />
							<label htmlFor={optionvalue} className="option-label">
								{optionvalue}
							</label>
							<br />
						</div>
					);
				})}
			</div>
		);
	}
	if (qtype === QuestionType.CHECKBOX) {
		return (
			<div className="answer-container">
				{Questions.questions[currentQuestion - 1].questionoption.map(({ optionid, optionvalue }) => {
					return (
						<div className="option-value" key={optionid.toString()}>
							<input type="checkbox" id={optionvalue} name={Questions.questions[currentQuestion - 1].question} value={optionvalue} onChange={onAnswerChange} />
							<label htmlFor={optionvalue} className="option-label">
								{optionvalue}
							</label>
							<br />
						</div>
					);
				})}
			</div>
		);
	}
	if (qtype === QuestionType.DATE) {
		return (
			<div className="answer-container">
				<input type="date" value={answer.answerDate || new Date()} onChange={onAnswerChange} className="option-value" />
			</div>
		);
	}
	if (qtype === QuestionType.TEXTAREA) {
		return (
			<div className="answer-container">
				<textarea value={answer.answerText} className="option-value" rows={6} cols={50} onChange={onAnswerChange} />
			</div>
		);
	}
	return null;
}

export default Answer;
