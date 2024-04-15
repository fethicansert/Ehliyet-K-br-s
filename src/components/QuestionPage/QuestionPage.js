import React, { useEffect, useState } from 'react';
import { Triangle } from 'react-loader-spinner';
import axios from '../../api/axios';
import QuestionCard from './QuestionCard';
import { useParams } from 'react-router-dom';


const QUESTIONS_URL = '/traffic-sign-question';

const QuestionPage = () => {

    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [shuffledQuestions, setShuffledOuestions] = useState([]);
    const [error, setError] = useState(false);
    //get param to choose which questions to fetch
    const {soru} = useParams(); 

    useEffect(() => {
        //controller for abort request if needed and isMounted for decide to set or unset state
        const controller = new AbortController();
        let isMounted = true;

        const getQuestions = async () => {

            try {
                //get quetions from db
                const response = await axios.get(`${QUESTIONS_URL}/${soru}`, { signal: controller.signal });
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

    //every time shuffle the current questions array to get random questions
    useEffect(() => {

        //learn this shuffled function
        function shuffleArray(arr) {
            const array = arr.slice();
            for (var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        };
        //shuflle current question
        const shuffledArray = shuffleArray(questions);

        //set shuffled question
        setShuffledOuestions(shuffledArray);

    }, [questions])

    //changing display to center loading spinner
    const loadingStyle = {
        display: isLoading ? 'flex' : 'block',
        alignItems: 'center',
        justifyContent: 'center',
        height: isLoading ? '80vh' : 'fit-content',
    };

    //set error page
    return (
        <div className='question-page' style={loadingStyle}>
            {
                isLoading
                    ? <Triangle
                        width='250'
                        height='250'
                        color='red'
                    />
                    : !error
                        ? <QuestionCard
                            question={shuffledQuestions[currentQuestionIndex]}
                            setCurrentQuestionIndex={setCurrentQuestionIndex}
                        />
                        : <p>ERROR</p>
            }
        </div>
    );
}

export default QuestionPage
