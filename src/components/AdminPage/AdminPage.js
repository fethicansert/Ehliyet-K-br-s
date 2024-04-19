import React, { useState } from 'react'
import axios from "../../api/axios";
import useGetRandomAnswer from '../../hooks/useGetRandomAnswer';

const AdminPage = ({setSigns}) => {

    const [image, setImage] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [type, setType] = useState('yasak-tahdit');
    const getRandomAnswer = useGetRandomAnswer();

    
    const addTrafficSing = async (e) => {

        e.preventDefault();

        //set Answers
        const choiceA = { answer: '', isCorrect: false }
        const choiceB = { answer: '', isCorrect: false }
        const choiceC = { answer: '', isCorrect: false }
        const choiceD = { answer: '', isCorrect: false }

        //put all answers to answers array-list
        const answers = [
            choiceA,
            choiceB,
            choiceC,
            choiceD,
        ];

        //set random correctAnswer index-number
        const correctAnswerIndex = Math.floor(Math.random() * 4);

        //set correct answer
        answers[correctAnswerIndex].isCorrect = true;

        //arr for used answers coming from getRandomAnswer func
        const usedAnswers = [];

        //if currenct answer going to be correct answer set correct answer 
        //and set random answer for uncorrect answers
        answers.map((currentAnswer) => {
            if(currentAnswer.isCorrect) return currentAnswer.answer = correctAnswer.toLowerCase();

            currentAnswer.answer = getRandomAnswer(correctAnswer, usedAnswers);

            usedAnswers.push(currentAnswer.answer);
        });

        const bodyContent = {
            image,  // => image: image_str
            choiceA,
            choiceB,
            choiceC,
            choiceD,
            type
        };
        
        try {
            const response = await axios.post('/traffic-sign-question', bodyContent);
            console.log(response);
            // setImage('');

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='admin-page'>
            <h1 className='title'>Add Traffic Sign Qustion</h1>
            <div className='grid'>
                <form onSubmit={addTrafficSing}>
                    <div className='input-group'>
                        <label htmlFor='image'>
                            Image Path:
                        </label>
                        <input
                            className='trafic-sign-input'
                            id='image'
                            type='text'
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <label htmlFor='correctAnswer'>
                            Correct Answer:
                        </label>
                        <input
                            className='trafic-sign-input'
                            id='correctAnswer'
                            type='text'
                            value={correctAnswer}
                            onChange={(e) => setCorrectAnswer(e.target.value)}
                            required
                        />
                    </div>

                    <div className='input-group'>
                        <label htmlFor='type'>
                            Type:
                        </label>
                        <input
                            className='trafic-sign-input'
                            id='type'
                            type='text'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            required
                        />
                    </div>

                    <button className='add-traffic-sign-button' >
                        ADD
                    </button>
                </form>

                <img className='traffic-sign-image' src={image} />
            </div>
        </div>
    );
}

export default AdminPage
