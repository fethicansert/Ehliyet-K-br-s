import React, { useContext } from 'react'
import { QuestionContext } from '../context/QuestionProvider.js'

const useQuestion = () => {
  return useContext(QuestionContext);
}

export default useQuestion
