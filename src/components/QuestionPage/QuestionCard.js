import React, { useState } from 'react'
import { v4 as uuid } from 'uuid';
import AnswerButton from './AnswerButton';
const QuestionCard = ({ question, setCurrentQuestionIndex }) => {


    return (
        <div className='question-card'>
            <img src={question?.image} className='traffic-sign-image' />
            <div className='question-answer-group'>
                {question?.choices.map(choice => 
                <AnswerButton
                    setCurrentQuestionIndex={ setCurrentQuestionIndex }
                    choice={choice}
                    key={uuid()}
                    >
                    {choice.answer}
                </AnswerButton>)}
            </div>
        </div>
    )
}

export default QuestionCard
