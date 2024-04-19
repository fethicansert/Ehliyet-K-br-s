import React, { useRef, useState } from 'react'
import { v4 as uuid } from 'uuid';
import AnswerButton from './AnswerButton';
import { useNavigate } from 'react-router-dom';

const QuestionCard = ({ question, setCurrentQuestionIndex, currentQuestionIndex, setPop, pop, questionLength, headerName }) => {

    const correctAnswersRef = useRef(0);
    const navigate = useNavigate();
    
    console.log(question?.type);
    return (
        <>
            {
                currentQuestionIndex !== questionLength

                    //if not end of the questions show questions

                    ? <div className='question-card'>

                        <div className='question-informarion-group'>
                            <h2>{headerName}</h2>
                            <   span className='question-number'>{currentQuestionIndex + 1}</span>
                        </div>

                        <img src={question?.image} className='traffic-sign-image' />
                        <div className='question-answer-group'>
                            {question?.choices.map(choice =>
                                <AnswerButton
                                    correctAnswersRef={correctAnswersRef}
                                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                                    choice={choice}
                                    key={uuid()}
                                >
                                    {choice.answer}
                                </AnswerButton>)}
                            <hr className='button-seperater'></hr>
                            <button onClick={() => setCurrentQuestionIndex(prevIndex => prevIndex + 1)} className='pass-question-button' >geç</button>
                            <button onClick={() => setPop(!pop)} className='save-question-button' >çalışmam lazım</button>
                        </div>
                    </div>

                    //Show this if end of the questions
                    : <div className='user-question-finish-box'>
                        <p><span>{correctAnswersRef.current} / {questionLength}</span><br/> 
                            Soruyu Dogru Yaptiniz !
                        </p>
                        <div className='user-question-finish-button-group'>
                            <button className='question-again-button' onClick={() => { window.location.reload() }}>Tekrar Et</button>
                            <button className='go-soru-menu-button' onClick={() => navigate('/sorular-menu')}>Soru Menüsune Dön</button>
                        </div>
                    </div>
            }
        </>

    );
}

export default QuestionCard
