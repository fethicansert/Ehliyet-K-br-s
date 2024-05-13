import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../api/axios';
import QuestionCard from './QuestionCard';
import Popup from './Popup';
import useQuestion from '../../hooks/useQuestion';
import { Triangle } from 'react-loader-spinner';
import { MdPlaylistAddCheck } from "react-icons/md";
import { MdPlaylistAdd } from "react-icons/md";
import { RiLoginBoxLine } from "react-icons/ri";
import useAuth from '../../hooks/useAuth';


const QUESTIONS_URL = '/traffic-sign-question';
const USER_QUSETION_URL = '/users/questions';


const QuestionPage = () => {

    

    const { isDuplicateQuestion, currentQuestionIndex, questions, setQuestions } = useQuestion();

    console.log(questions.length);
    const { auth } = useAuth();

    const [isLoading, setIsLoading] = useState(true);

    const [isPopLoading, setIsPopLoading] = useState(false);

    const [error, setError] = useState(false);

    const { soru_param } = useParams();

    const questionPageRef = useRef();

    const [errorText, setErrorText] = useState('');

    //pop state for show or not show popup message
    const [pop, setPop] = useState(false);

    useEffect(() => {
        //controller for abort request if needed and isMounted for decide to set or unset state
        const controller = new AbortController();
        let isMounted = true;

        const getQuestions = async () => {

            try {

                //set url according to soru_param if usere use user api if not use standart question api
                const URL = soru_param.slice(0, 4) === 'user' ? USER_QUSETION_URL : QUESTIONS_URL;

                //set url parameter according to soru_param
                const param = soru_param.slice(0, 4) === 'user' ? soru_param.slice(5,)
                    : soru_param === 'karisik' ? ''
                        : soru_param;

                // //get quetions from db
                const response = await axios.get(`${URL}/${param}`
                    , { signal: controller.signal });
                const resQuestions = response.data;

                //if comp not unmounted set question for no memory leak
                if (isMounted) setQuestions(resQuestions);


            } catch (err) {
                //Show Error comp
                setError(true);
                setErrorText(err);
                console.log(err);

            } finally {
                setIsLoading(false);
            }
        };
        
    
        //Eger user tarafinda gelirsem user questionlarim olacak ve bu fonksiyionu cagirmaya gerek yok
        !questions.length ? getQuestions() : setIsLoading(false);

        //ABORT REQUEST AND set ISMOUNTED to false to not execute unnessary state update
        const cleanUp = () => {
            controller.abort();
            isMounted = false;
            console.log("Question Page unmounted");
        }
        return cleanUp
    }, []);

    //set error page
    return (
        <>
            <div className='question-page' ref={questionPageRef} onClick={() => setPop(false)}
                style={{ filter: pop ? 'blur(2px)' : 'unset' }}>
                {
                    isLoading
                        ? <Triangle
                            width='250'
                            height='250'
                            color='red'
                        />
                        : !error
                            ? <QuestionCard
                                setIsPopLoading={setIsPopLoading}
                                questionLength={questions.length}
                                question={questions[currentQuestionIndex]}
                                setPop={setPop}
                                pop={pop}
                            />
                            : <p>{errorText.message}</p>
                }
            </div>

            {/* Pop up iki farkli mesaj gosteriyor biri calismam lazima eklensinmi digeri zaten bulunuyor */}
            {pop && <Popup
                isLoading={isPopLoading}
                buttonVisible={!auth?.user ? true : false}
                icon={
                    !auth.user ? <RiLoginBoxLine size={70} />
                        : auth.user && isDuplicateQuestion ? <MdPlaylistAddCheck className='popup-icon-margin' size={100} />
                            : <MdPlaylistAdd className='popup-icon-margin' size={100} />
                }
                text={
                    !auth.user ? 'Calışmam lazımı kullanabilmek için giriş yapmanız gerekmektedir.'
                        : auth.user && isDuplicateQuestion ? 'Soru Çalışmam Lazim Listende Bulunuyor !'
                            : ' Soru Çalışmam Lazim Listesine Eklendi'
                } />}
        </>

    );
}

export default QuestionPage
