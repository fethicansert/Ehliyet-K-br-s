import kibrisIcon from '../../images/header-icon.png';
import Navbar from './Navbar';
import { RxHamburgerMenu } from "react-icons/rx";
import { RiUser6Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const Header = ({isClose, setIsClose}) => {

    const navigate = useNavigate();
    const { auth } = useAuth();

    return (
        <header onClick={(e) =>  e.stopPropagation()}>
            <div className='header-title-group'>
                <img src={kibrisIcon} className='header-icon'></img>
                <h1 className='header-title'>Ehliyet Kıbrıs</h1>
            </div>
            <RiUser6Fill 
                size={'22'} 
                className='header-user-icon'
                onClick={() => {
                    navigate('/user');
                    setIsClose(true);
                }}
            />
            <RxHamburgerMenu 
                onClick={(event) => {
                    event.stopPropagation();
                    setIsClose(!isClose);
                }} 
                size={'22'} 
                className='header-burger-icon'
            />
            <Navbar isClose={isClose} setIsClose={setIsClose}/>
        </header>
    )
}

export default Header
