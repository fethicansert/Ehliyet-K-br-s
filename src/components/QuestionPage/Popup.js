import React from 'react'

const Popup = ({text, onYesClick, onNoClick}) => {
  return (
    <div className='popup'>
      <p>{text}</p>
      <div className='popup-button-group'>
        <button onClick={onYesClick} className='popup-yes-button'>Evet</button>
        <button onClick={onNoClick} className='popup-no-button'>Hayır</button>
      </div>
    </div>
  )
}

export default Popup
