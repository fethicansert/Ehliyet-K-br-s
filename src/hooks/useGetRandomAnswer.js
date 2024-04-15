import React from 'react'
import { tehlike_ve_ikaz, yasak_ve_tahdit } from '../data/trafficSigns';

const useGetRandomAnswer = () => {

    const getRandomAnswer = (correctAnswer, usedAnswers) => {

        console.log('getrandom');
        const allSings = [tehlike_ve_ikaz, yasak_ve_tahdit];

        //get random index number for sign list
        const randomSignListIndex = Math.floor(Math.random() * 2);

        //choosse Sign List randomly
        const choossenSings = allSings[randomSignListIndex];

        //get random index number for random sign
        const randomSingIndex = Math.floor(Math.random() * choossenSings.length);

        //set random Sign
        const randomSign = choossenSings[randomSingIndex];

        //random sign equal to correct answer or used answer
        //try again we don't want see 2 - 3 or 4 same answer
        if (randomSign.toLowerCase() === correctAnswer.toLowerCase() || usedAnswers.includes(randomSign.toLowerCase())) {
            console.log("random sign equal correct answer veya usedanswer");
            return getRandomAnswer(correctAnswer, usedAnswers);
        }
    
        //return randomSign
        return randomSign

    };

    return getRandomAnswer
}

export default useGetRandomAnswer
