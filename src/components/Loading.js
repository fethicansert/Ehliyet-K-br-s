import React from 'react'
import { Triangle } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div style={{height: '100vh'}}>
        <Triangle width={200} height={200} color='red'/>
    </div>
  )
}

export default Loading
