import React, { useState, useRef } from 'react'
import useQuestion from '../../hooks/useQuestion';
const AnswerButton = ({ choice, letter}) => {

    const { isSavedQuestionRef, setIsDuplicateQuestion, setCurrentQuestionIndex, correctAnswersRef } = useQuestion();
    
   //initial Style of Button
    const [style, setStyle] = useState({
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, .85)'
    });


    const checkAnswer = (isCorrect) => {

        //if answer correct change style of button to green and pass to next question
        if (isCorrect) {
            setStyle(prevStyle => ({ ...prevStyle, backgroundColor: 'rgb(72, 182, 72)', color: 'white' }));
            correctAnswersRef.current = correctAnswersRef.current + 1;
            //time out allow users to see green button color
            setTimeout(() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                setIsDuplicateQuestion(false);
                isSavedQuestionRef.current = false;
            }, 250)
        } else {
            //if answer notCorrect change style of button to red 
            setStyle(prevStyle => ({ ...prevStyle, backgroundColor: 'rgb(208, 54, 54)', color: 'white' }))
        }
    }

    return (
        <button
            className='answer-button'
            style={style}
            onClick={() => checkAnswer(choice.isCorrect)}
            onMouseOver={() => setStyle(style => ({ ...style, outline: '2px solid rgba(23, 150, 196, 0.774)' }))}
            onMouseLeave={() => setStyle(style => ({ ...style, outline: 'none' }))}
        >
            <div className='button-choice-container'>
                <span className='button-choice-letter'>{letter}</span>
                <p className='button-choice-text'>{choice.answer}</p>
            </div>
          
        </button>
    )
}

export default AnswerButton
