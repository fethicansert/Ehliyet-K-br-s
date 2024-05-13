import React from 'react'
import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import useAuth from '../../hooks/useAuth';
const Navbar = ({ isClose, setIsClose }) => {


    const { auth } = useAuth();

    const isDesktop = useMediaQuery({
        query: '(min-width: 1024px)'
    });


    const navMobileStyle = {
        scale: isClose ? '1 0' : '1 1',
        transition: isClose ? 'scale 200ms ease' : 'scale 275ms ease'
    }

    const navDesktopStyle = {
        scale: '1 1',
        transition: 'scale 0ms ease'
    }

    const linkMobileStyle = {
        transition: isClose ? 'opacity 100ms ease' : 'opacity 1s ease  200ms',
        opacity: isClose ? '0' : '1'
    };

    const linkDesktopStyle = {
        opacity: '1',
        transition: 'opacity 0ms ease'
    }

    const userLinkMobileStyle = {
        transition: isClose ? 'opacity 100ms ease' : 'opacity 1s ease  200ms',
        opacity: isClose ? '0' : '1',
        display : !auth?.user ? 'block' : 'none'
    }

    const userLinkDesktopStyle = {
        opacity: '1',
        transition: 'opacity 0ms ease'
    }

    return (
        <nav className='header-nav-bar' style={!isDesktop ? navMobileStyle : navDesktopStyle}>
            <ul>
                <li style={!isDesktop ? linkMobileStyle : linkDesktopStyle}>
                    <NavLink onClick={() => setIsClose(!isClose)} to={'/'}>Ana Sayfa</NavLink>
                </li>

                <li style={!isDesktop ? linkMobileStyle : linkDesktopStyle}>
                    <NavLink onClick={() => setIsClose(!isClose)} to={'/sofor-okullari'}>Şöför Okulları</NavLink>
                </li>
                <li style={!isDesktop ? linkMobileStyle : linkDesktopStyle}>
                    <NavLink onClick={() => setIsClose(!isClose)} to={'/levhalar'}>Levhalar</NavLink>
                </li>
                <li style={!isDesktop ? linkMobileStyle : linkDesktopStyle}>
                    <NavLink onClick={() => setIsClose(!isClose)} to={'/sorular'}>Soru Çöz</NavLink>
                </li>

                <li style={!isDesktop ? userLinkMobileStyle : userLinkDesktopStyle}>
                    {
                        !auth.user
                            ? <NavLink onClick={() => setIsClose(!isClose)} to={'/giris-yap'}>Giriş Yap / Kaydol</NavLink>
                            : <NavLink onClick={() => setIsClose(!isClose)} to={'/user'}>{auth.user}</NavLink>
                    }
                </li>

            </ul>
        </nav>
    )
}

export default Navbar
