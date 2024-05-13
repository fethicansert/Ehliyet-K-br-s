import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { Triangle } from 'react-loader-spinner';

const Popup = ({ text, icon, isLoading, buttonVisible }) => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      {!isLoading
        ? <div className='popup'>
            {icon}
            <p className='popup-text'>{text}</p>
            {buttonVisible && 
              <button 
                onClick={() => navigate('/giris-yap',{ state: { from: location } }) }
                className='popup-login-button'>
                GİRİŞ YAP
              </button>}
         </div>

        : <Triangle 
            width='200'
            height='200'
            color='#17A551' />
      }

    </>

  )
}

export default Popup
