import { createContext, useState, ReactNode } from "react";
import { IAnswer } from "../Components/Questions/QuestionWithAnswer";

interface PropsType {
	children: ReactNode;
}

interface QuizContextInterface {
	currentQuestion: number;
	setCurrentQuestion?: (questionCounter: number) => void;
	answers: Array<{ key: number; value: IAnswer }>;
	setAnswers?: (answersArg: any) => void;
}

export const QuizContext = createContext<QuizContextInterface>({
	currentQuestion: 1,
	answers: [],
});

export const QuizContextProvider = ({ children }: PropsType) => {
	const [currentQuestion, setCurrentQuestion] = useState(1);
	const [answers, setAnswers] = useState([]);

	return (
		<QuizContext.Provider
			value={{
				currentQuestion,
				setCurrentQuestion,
				answers,
				setAnswers,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};
