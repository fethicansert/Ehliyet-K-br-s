import React, { useState } from 'react'

const AnswerButton = ({ choice, setCurrentQuestionIndex }) => {

    const [style, setStyle] = useState({
        backgroundColor: 'white',
        color: 'rgb(92, 68, 68)',
        boxShadow: '1px 1px 3px rgba(0, 0, 0, 0.47)'
    });

    const checkAnswer = (isCorrect) => {

        if (isCorrect) {
            setStyle(prevStyle => ({ ...prevStyle, backgroundColor: 'rgb(72, 182, 72)', color: 'white' }))
            setTimeout(() => {
                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
            }, 150)
        } else {
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
            {choice.answer}
        </button>
    )
}

export default AnswerButton
