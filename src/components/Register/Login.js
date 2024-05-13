import React, { useEffect, useState } from 'react'
import useLocalStorage from '../../hooks/useLocalStorage';
import { RiUser6Fill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import { Triangle } from 'react-loader-spinner';
const LOGIN_URL = '/auth';

const Login = () => {

    const location = useLocation();
    const fromLocation = location?.state?.from.pathname || '/';

    const [user, setUser] = useLocalStorage('user', '');
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [pwdFocus, setPwdFocus] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const { setAuth, auth } = useAuth();

    const [userError, setUserError] = useState(false);

    const [pwdError, setPwdError] = useState(false);

    const navigate = useNavigate();

    const iconSize = 26;

    const handleLogin = async (e) => {
        //reset Errors
        setPwdError(false);
        setUserError(false);

        e.preventDefault();
        const bodyContent = {
            user,
            pwd
        };

        try {
            setIsLoading(true);
            const response = await axios.post(LOGIN_URL, bodyContent, {
                withCredentials: true,
            });
            const accessToken = response?.data?.accessToken;
            const decoded = jwtDecode(accessToken);
            const user = decoded.UserInfo.username;
            const roles = decoded.UserInfo.roles;
            setAuth({ user, roles });
            navigate(fromLocation, { replace: true });
        } catch (err) {
            console.log(err.response);
            if (err?.response?.data) {

                const errorType = err.response.data.error;

                if (errorType === 'username') {
                    setUserError(true);
                } else if (errorType === 'password') {
                    setPwdError(true);
                }

               
            } else {
                console.log(err);
            }
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='register-page'>
            <form className='register-form' onSubmit={handleLogin} style={{ filter: isLoading ? 'blur(2px)' : 'unset' }}>

                <div className='register-input-group'>
                    <label
                        className='register-label'
                        htmlFor='username'> Kullanıcı Adı
                    </label>
                    <div className='icon-input-group'>
                        <input
                            id='username'
                            className='register-input'
                            type='text'
                            autoFocus
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            autoComplete='true'
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => {setUserFocus(false)}}
                        />
                        <RiUser6Fill
                            className='register-user-icon'
                            size={iconSize}
                            color={userError ? 'red': 'rgba(47, 47, 47, 0.9)'}
                        />
                        <div className={userError && !pwdFocus ? 'input-validation active-validation' : 'input-validation'}>
                            <p className='input-validation-message'>Kullanıcı Adı Hatalı !</p>
                        </div>

                    </div>
                </div>

                <div className='register-input-group'>
                    <label
                        className='register-label'
                        htmlFor='password'> Şifre
                    </label>
                    <div className='icon-input-group'>
                        <input
                            id='password'
                            className='register-input'
                            type='password'
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                            required
                            autoComplete='false'
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <RiLockPasswordFill
                            className='register-user-icon'
                            size={iconSize}
                            color={pwdError ? 'red': 'rgba(47, 47, 47, 0.9)'}
                        />

                        <div className={pwdError && !userFocus ? 'input-validation active-validation' : 'input-validation'}>
                            <p className='input-validation-message'>Şifre Hatalı !</p>
                        </div>
                    </div>
                </div>

                <button className='register-button'>Giriş Yap</button>

                <p className='login-link-text'>Hesabın Yok Mu ? <Link to={'/kaydol'} className='login-link' >Kaydol</Link></p>

            </form>

            { isLoading && <Triangle width={200} height={200} color='#2542a2'/>}
        </div>
    )
}

export default Login
