import React from 'react'
import { v4 as uuid } from 'uuid';

const Sign = ({ sign }) => {
    return (
        <div>
            <img className='traffic-sign-image' src={sign.image} />
            <ul>
                {
                    sign.choices.map(choice =>
                        <li
                            style={{color: choice.isCorrect ? 'green' : 'red'}}
                            key={uuid()}>
                            {choice.answer}
                        </li>)
                }

            </ul>
        </div>
    )
}

export default Sign
