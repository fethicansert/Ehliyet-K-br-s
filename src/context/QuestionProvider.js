import React, { createContext, useRef, useState } from 'react'

export const QuestionContext = createContext({});

const QuestionProvider = ({children}) => {

    const isSavedQuestionRef = useRef(false);
    const [isDuplicateQuestion, setIsDuplicateQuestion] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [questions, setQuestions] = useState([]);
    const correctAnswersRef = useRef(0);

    return (
        <QuestionContext.Provider
            value={{
                isSavedQuestionRef,
                isDuplicateQuestion,
                setIsDuplicateQuestion,
                currentQuestionIndex,
                setCurrentQuestionIndex,
                questions,
                setQuestions,
                correctAnswersRef
            }}
        >
            {children}
        </QuestionContext.Provider>
    )
}

export default QuestionProvider
