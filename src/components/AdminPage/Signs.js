import React, { useEffect, useState } from 'react'
import axios from '../../api/axios';
import Sign from './Sign';
import { v4 as uuid } from 'uuid';

const Signs = ({signs}) => {

  return (
    <div className='signs'>
      {
        !signs.length
          ? <p>Signs are Empty</p>
          : signs.map(sign => <Sign key={uuid()} sign={ sign }/>)
      }
    </div>
  )
}

export default Signs
