import React, { useRef, useMemo, useState } from 'react'
import { v4 as uuid } from 'uuid';
import AnswerButton from './AnswerButton';
import { useNavigate } from 'react-router-dom';
import useQuestion from '../../hooks/useQuestion';
import axios from '../../api/axios';
import { useParams } from 'react-router-dom';
import useSetHeader from '../../hooks/useSetHeader';
import useAuth from '../../hooks/useAuth';

const SAVE_QUESTION = '/users';

const QuestionCard = ({ question, pop, setPop, questionLength, setIsPopLoading }) => {

    const {
        isSavedQuestionRef,
        isDuplicateQuestion,
        setIsDuplicateQuestion,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        correctAnswersRef
    } = useQuestion();

    const { auth } = useAuth();

    const navigate = useNavigate();

    const { soru_turu } = useParams();


    //Select header according to soru-turu param - This function execute if soru_turu changes
    const headerName = useSetHeader(soru_turu);

    const saveQuestion = async (question) => {

        console.log(auth.user);
        if (!auth?.user) return setPop(true);

        //check if question saved or 
        if (isSavedQuestionRef.current || isDuplicateQuestion) {
            setIsDuplicateQuestion(true);
            setPop(true);
            return;
        };

        //Kullanicinin questions arrayini eklecek sorunun idsi.
        const questionId = question._id;
        const user = auth?.user;
        console.log(user);
        const bodyContent = {
            user,
            questionId
        }

        try {
            setIsPopLoading(true);
            setPop(true);
            await axios.post(SAVE_QUESTION, bodyContent);
            isSavedQuestionRef.current = true;
        } catch (err) {
            //diger errorlarada bakmak lazim!!!
            if (err.response?.status === 409) {
                setPop(true);
                setIsDuplicateQuestion(true);
            }
        } finally {
            setIsPopLoading(false);
        }
    };

    return (
        <>
            {
                currentQuestionIndex !== questionLength

                    //if not end of the questions show questions
                    //if popup message poped question card pointEvents none buttons are untouchable
                    ? <div className='question-card' style={{ pointerEvents: pop ? 'none' : 'unset' }}>

                        {/* Question Infro */}
                        <div className='question-informarion-group'>
                            <h2>{headerName}</h2>
                            <   span className='question-number'>{currentQuestionIndex + 1}</span>
                        </div>

                        {/* Question Image */}
                        <img src={question?.image} className='traffic-sign-image' />

                        {/* Question Choicess */}
                        <div className='question-answer-group'>
                            {question?.choices.map((choice, index) =>
                                <AnswerButton
                                    choice={choice}
                                    key={uuid()}
                                    letter={index === 0 ? 'A' : index === 1 ? 'B' : index === 2 ? 'C' : "D"}
                                >
                                    {choice.answer}
                                </AnswerButton>)}

                            <hr className='button-seperater'></hr>

                            {/* Question Pass Button */}
                            <button onClick={() => {
                                setCurrentQuestionIndex(prevIndex => prevIndex + 1);
                                setIsDuplicateQuestion(false);
                                isSavedQuestionRef.current = false;
                            }} className='pass-question-button' >geç</button>

                            {/* Question Save Button */}
                            <button onClick={(e) => {
                                e.stopPropagation();
                                saveQuestion(question);
                            }} className='save-question-button' >çalışmam lazım</button>
                        </div>
                    </div>


                    //Show this if end of the questions
                    : <div className='user-question-finish-box'>
                        <div className='question-result-circle'>
                            <span>{correctAnswersRef.current} / {questionLength}</span>
                            <p>
                                Soruyu Dogru Yaptiniz !
                            </p>
                        </div>

                        <div className='user-question-finish-button-group'>
                            <button className='question-again-button' onClick={() => { window.location.reload() }}>Tekrar Et</button>
                            <button className='go-soru-menu-button' onClick={() => navigate('/sorular')}>Soru Menüsune Dön</button>
                        </div>
                    </div>
            }
        </>

    );
}

export default QuestionCard
