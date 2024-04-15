import React, { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { GiTriangleTarget } from "react-icons/gi";
import { RxHamburgerMenu } from "react-icons/rx";
import kibrisIcon from '../../images/header-icon.png';
import Navbar from './Navbar';
const Header = () => {

    const [isClose, setIsClose] = useState(true);

    return (
        <header>
            <div className='header-title-group'>
                <img src={kibrisIcon} width={'50px'}></img>
                <h1 className='header-title'>Ehliyet Kibris</h1>
            </div>
            <GiHamburgerMenu onClick={() => {setIsClose(!isClose)}} size={'30'} className='header-burger-icon' />
            <Navbar isClose={isClose} setIsClose={setIsClose}/>
        </header>
    )
}

export default Header
