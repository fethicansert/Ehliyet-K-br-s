import React, { useEffect, useMemo, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import axios from '../../api/axios';
import QuestionCard from './QuestionCard';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import Popup from './Popup';


const QUESTIONS_URL = '/traffic-sign-question';

const QuestionPage = () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { soru_turu } = useParams();

    
    //pop state for show or not show popup message
    const [pop, setPop] = useState(false);

    //changing styles with according to size of witdh
    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    });

    const questionPageStyle = {
        // height: !isDesktop  ? 'calc(100vh - 50.35px)' : 'calc(100vh - 80.89px)'
    }

    useEffect(() => {
        //controller for abort request if needed and isMounted for decide to set or unset state
        const controller = new AbortController();
        let isMounted = true;

        const getQuestions = async () => {

            try {
                //set param to decide which api to use in server
                const param = soru_turu === 'karisik' ? '' : soru_turu;

                //get quetions from db
                const response = await axios.get(`${QUESTIONS_URL}/${param}`
                    , { signal: controller.signal });
                const questions = response.data;

                //if comp not unmounted set question for no memory leak
                if (isMounted) setQuestions(questions);


            } catch (err) {
                setError(true);
                console.log(err);

            } finally {
                setIsLoading(false);
            }
        };

        getQuestions();

        //ABORT REQUEST AND set ISMOUNTED to false to not execute unnessary state update
        const cleanUp = () => {
            controller.abort();
            isMounted = false;
        }
        return cleanUp

    }, []);


    //Select header according to soru-turu param
    const headerName = useMemo(() => {
        let header;
        switch (soru_turu) {
            case 'karisik':
                header = 'Karışık Levha Soruları';
                break;
            case 'tehlike-ikaz':
                header = 'Tehlike Ve Ikaz Levha Soruları';
                break
            case 'yasak-tahdit':
                header = 'Yasak Ve Tahdit Levha Soruları';
                break
            case 'durma-parketme':
                header = 'Durma Ve Park Etme Levha Soruları';
                break
            case 'bilgiverici':
                header = 'Bilgi Verici Levha Sorulari';
                break
            case 'otoyol':
                header = 'Otoyol Levha Soruları';
                break
            default:
                break;
        }
        return header;
    }, [soru_turu]);

    //set error page
    return (
        <>
            <div className='question-page'
                style={{ filter: pop ? 'blur(2px)' : 'unset', pointerEvents: pop ? 'none' : 'unset' }}>
                {
                    isLoading
                        ? <Triangle
                            width='250'
                            height='250'
                            color='red'
                        />
                        : !error
                            ? <QuestionCard
                                headerName={headerName}
                                questionLength={questions.length}
                                currentQuestionIndex={currentQuestionIndex}
                                question={questions[currentQuestionIndex]}
                                setCurrentQuestionIndex={setCurrentQuestionIndex}
                                setPop={setPop}
                                pop={pop}
                            />
                            : <p>ERROR</p>
                }
            </div>
            {pop && <Popup
                text={"Bu soruyu çalışmam lazım listesine eklemek istediğine emin misin ?"}
                onNoClick={() => setPop(false)}
                onYesClick={() => setPop(false)}
            />}
        </>

    );
}

export default QuestionPage
