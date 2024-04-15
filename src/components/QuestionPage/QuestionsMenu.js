import React, { useEffect, useState } from 'react'
import yasakVeTahdit from '../../images/levhalar/1.png'
import tehlikeVeIkaz from '../../images/levhalar/2.png'
import bilgiverici from '../../images/levhalar/3.png'
import durmaVeParketme from '../../images/levhalar/4.png'
import otoyol from '../../images/levhalar/5.png'
import karisikLevha from '../../images/levhalar/6.png'
import { useNavigate } from 'react-router-dom'

//Mongosse Update versiyonu yaz

const QuestionsMenu = () => {
    
    const navigate = useNavigate();

    //navigate to sorlar(QuestionPage) with param 
    const navigateChoosenQusetion = (param) => {
        navigate(`/sorular/${param}`);
    }

    return (
        <div className='sorular-menu-page'>
            <div className='sorular-menu-page-title-group'>
                <h1 className='sorular-menu-page-title'>Levha Soruları</h1>
                <p className='sorular-menu-page-title-text'>Her türden levha sorusu çözerek kendini daha hazır hisset !</p>
            </div>

            <div className='sorular-menu-grid'>
                <div className='box' onClick={() => navigateChoosenQusetion('karisik')}>
                    <img className='soru-levha-img' src={karisikLevha} ></img>
                </div>
                <div className='box' onClick={() => navigateChoosenQusetion('yasak-tahdit')}>
                    <img className='soru-levha-img' src={yasakVeTahdit} ></img>
                </div>
                <div className='box' onClick={() => navigateChoosenQusetion('tehlike-ikaz')}>
                    <img className='soru-levha-img' src={tehlikeVeIkaz} ></img>
                </div>
                <div className='box' onClick={() => navigateChoosenQusetion('durma-parketme')}>
                    <img className='soru-levha-img' src={durmaVeParketme} ></img>
                </div>
                <div className='box' onClick={() => navigateChoosenQusetion('bilgiverici')}>
                    <img className='soru-levha-img' src={bilgiverici} ></img>
                </div>
                <div className='box' onClick={() => navigateChoosenQusetion('otoyol')}>
                    <img className='soru-levha-img' src={otoyol} ></img>
                </div>
            </div>

        </div>
    );
}

export default QuestionsMenu
