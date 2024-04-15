import React from 'react'
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive'
const Navbar = ({ isClose, setIsClose }) => {

    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1024px)'
    })

    const navMobileStyle = {
        scale: isClose ? '1 0' : '1 1',
        transition: isClose ? 'scale 200ms ease' : 'scale 275ms ease'
    }

    const liMobileStyle = {
        transition: isClose ? 'opacity 100ms ease' : 'opacity 1s ease  200ms',
        opacity: isClose ? '0' : '1'
    };

    const liDesktopStyle = {
        opacity: '1',
        transition: 'opacity 0ms ease'
    }

    const navDesktopStyle = {
        scale: '1 1',
        transition: 'scale 0ms ease'
    }

    return (
        <nav className='header-nav-bar' style={!isDesktopOrLaptop ? navMobileStyle : navDesktopStyle}>
            <ul>
                <li style={!isDesktopOrLaptop ? liMobileStyle : liDesktopStyle}>
                    <NavLink onClick={() => setIsClose(!isClose)} to={'/'}>Ana Sayfa</NavLink>
                </li>
                <li style={!isDesktopOrLaptop ? liMobileStyle : liDesktopStyle}>
                    <NavLink onClick={() => setIsClose(!isClose)} to={'/ehliyet-okullari'}>Şöför Okulları</NavLink>
                </li>
                <li style={!isDesktopOrLaptop ? liMobileStyle : liDesktopStyle}>
                    <NavLink onClick={() => setIsClose(!isClose)} to={'/levhalar'}>Levhalar</NavLink>
                </li>
                <li style={!isDesktopOrLaptop ? liMobileStyle : liDesktopStyle}>
                    <NavLink onClick={() => setIsClose(!isClose)} to={'/sorular-menu'}>Soru Çöz</NavLink>
                </li>

                <li style={!isDesktopOrLaptop ? liMobileStyle : liDesktopStyle}>
                    <NavLink onClick={() => setIsClose(!isClose)} to={'/kaydol'}>Kaydol</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
