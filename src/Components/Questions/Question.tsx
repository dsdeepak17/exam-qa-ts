import React from "react";

interface IQuestion {
	text: string;
}

function Question(props: IQuestion) {
	const { text } = props;
	return (
		<>
			<p className="question-text">Q: {text}</p>
		</>
	);
}

export default Question;
