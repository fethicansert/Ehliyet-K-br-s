import React, { useEffect, useReducer, useRef, useState } from 'react'
import axios from '../../api/axios';
import { Link } from 'react-router-dom';
import { RiUser6Fill } from "react-icons/ri";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import userReducer from '../../reducers/userReducer';
import pwdReducer from '../../reducers/pwdReducer';
import emailReducer from '../../reducers/emailReducer';
import confirmPwdReducer from '../../reducers/confirmPwdReducer';
import { USER_ACTION } from '../../reducers/userReducer';
import { PWD_ACTION } from '../../reducers/pwdReducer';
import { EMAIL_ACTION } from '../../reducers/emailReducer';
import { CONFIRM_PWD_ACTION } from '../../reducers/confirmPwdReducer';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGISTER_URL = '/register';
const iconSize = 'clamp(22px, 3vh, 25px)';

const Register = () => {

  // User State with userReducer
  const [userState, userDispatch] = useReducer(userReducer,
    { user: '', validUser: false, userFocus: false, isDuplicateUsername: false });
  const userRef = useRef();

  // Email State
  const [emailState, emailDispatch] = useReducer(emailReducer,
    { email: '', validEmail: false, emailFocus: false });
  const emailRef = useRef();

  // Password State with pwdReducer
  const [pwdState, pwdDispacth] = useReducer(pwdReducer,
    { pwd: '', validPwd: false, pwdFocus: false });
  const pwdRef = useRef();

  // Confirm Password State
  const [confirmPwdState, confirmPwdDispatch] = useReducer(confirmPwdReducer,
    { confirmPwd: '', matchPwd: false, confirmFocus: false });
  const confrimPwdRef = useRef()

  const navigate = useNavigate();

  //VALIDATION OF USER INPUTS WITH REGEX
  useEffect(() => {
    const isValidUser = USER_REGEX.test(userState.user);
    userDispatch({ type: USER_ACTION.SET_VALID_USER, payload: isValidUser });
  }, [userState.user]);

  useEffect(() => {
    const isValidEmail = EMAIL_REGEX.test(emailState.email);
    emailDispatch({ type: EMAIL_ACTION.SET_VALID_EMAIL, payload: isValidEmail });
  }, [emailState.email])

  useEffect(() => {
    const isValidPwd = PWD_REGEX.test(pwdState.pwd);
    pwdDispacth({ type: PWD_ACTION.SET_VALID_PWD, payload: isValidPwd });
  }, [pwdState.pwd]);

  useEffect(() => {
    const isMatchPwd = pwdState.pwd === confirmPwdState.confirmPwd;
    confirmPwdDispatch({ type: CONFIRM_PWD_ACTION.SET_MATCH_PWD, payload: isMatchPwd });
  }, [confirmPwdState.confirmPwd])


  //SUBIT USER DATA TO SERVER TO REGISTER USER
  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validation before submitting
    if (!userState.validUser) return userRef.current.focus();

    if (!emailState.validEmail) return emailRef.current.focus();

    if (!pwdState.validPwd) return pwdRef.current.focus();

    if (!confirmPwdState.matchPwd) return confrimPwdRef.current.focus();

    //Help to server with this variable names
    const user = userState.user;
    const pwd = pwdState.pwd;
    const email = emailState.email;

    //request body
    const bodyContent = {
      user,
      pwd,
      email
    };

    try {
      const res = await axios.post(REGISTER_URL, bodyContent);
      if (res.status === 201) {
        navigate('/giris-yap');
      }

    } catch (err) {
      if (err?.response?.status === 409) {
        userDispatch({ type: USER_ACTION.SET_IS_DUPLICATE_USERNAME, payload: true });
        userDispatch({ type: USER_ACTION.SET_USER, payload: '' });
      }
    }
  }

  return (
    <div className='register-page'>
      <form className='register-form' onSubmit={handleSubmit}>
        {/* <h1>Kaydol</h1> */}
        {/* <p className='register-text'>Kaydol, başvur, sorularını çöz ve ehliyetini al !</p> */}

        {/* USERNAME INPUT*/}
        <div className='register-input-group'>
          <label
            className='register-label'
            htmlFor='username'> Kullanıcı Adı
          </label>
          <div className='icon-input-group'>
            <input
              ref={userRef}
              id='username'
              className='register-input'
              type='text'
              value={userState.user}
              onChange={(e) => userDispatch({ type: "setUser", payload: e.target.value })}
              required
              onFocus={() => {
                userDispatch({ type: USER_ACTION.SET_USER_FOCUS, payload: true });
                userDispatch({ type: USER_ACTION.SET_IS_DUPLICATE_USERNAME, payload: false });
              }}
              onBlur={() => userDispatch({ type: USER_ACTION.SET_USER_FOCUS, payload: false })}
              autoComplete='false'
            />
            <RiUser6Fill
              className='register-user-icon'
              size={iconSize}
              color={(userState.user && !userState.validUser) || userState.isDuplicateUsername ? 'rgb(235, 7, 7)' : userState.user && userState.validUser ? '#17A551' : 'rgba(47, 47, 47, 0.9)'}
            />

            <div className={(userState.userFocus && !userState.validUser && userState.user) || userState.isDuplicateUsername ? 'input-validation active-validation' : 'input-validation'}>
              <p className='input-validation-message'>{!userState.isDuplicateUsername ? 'Kullancı adı en az 4 harf içermelidir.' : 'Kullanici adı kullanılıyor !'}</p>
            </div>
          </div>

        </div>

        {/* EMAIL INPUT */}
        <div className='register-input-group'>
          <label
            className='register-label'
            htmlFor='email'> Email
          </label>
          <div className='icon-input-group'>
            <input
              ref={emailRef}
              id='email'
              className='register-input'
              type='text'
              value={emailState.email}
              onChange={(e) => emailDispatch({ type: EMAIL_ACTION.SET_EMAIL, payload: e.target.value })}
              required
              onFocus={(e) => emailDispatch({ type: EMAIL_ACTION.SET_EMAIL_FOCUS, payload: true })}
              onBlur={(e) => emailDispatch({ type: EMAIL_ACTION.SET_EMAIL_FOCUS, payload: false })}
              autoComplete='false'
            />
            <MdEmail
              className='register-user-icon'
              size={iconSize}
              color={emailState.email && !emailState.validEmail ? 'rgb(235, 7, 7)' : emailState.email && emailState.validEmail ? '#17A551' : 'rgba(47, 47, 47, 0.9)'} />

            <div className={(emailState.emailFocus && !emailState.validEmail && emailState.email) ? 'input-validation active-validation' : 'input-validation'}>
              <p className='input-validation-message'>Lütfen geçerli bir email adresi giriniz.</p>
            </div>
          </div>

        </div>

        {/* PASSWORD INPUT */}
        <div className='register-input-group'>
          <label
            className='register-label'
            htmlFor='password'> Şifre
          </label>
          <div className='icon-input-group'>
            <input
              ref={pwdRef}
              id='password'
              className='register-input'
              type='password'
              value={pwdState.pwd}
              onChange={(e) => pwdDispacth({ type: PWD_ACTION.SET_PWD, payload: e.target.value })}
              required
              autoComplete='false'
              onFocus={() => pwdDispacth({ type: PWD_ACTION.SET_PWD_FOCUS, payload: true })}
              onBlur={() => pwdDispacth({ type: PWD_ACTION.SET_PWD_FOCUS, payload: false })}
            />
            <RiLockPasswordFill
              className='register-user-icon'
              size={iconSize}
              color={pwdState.pwd && !pwdState.validPwd ? 'rgb(235, 7, 7)' : pwdState.pwd && pwdState.validPwd ? '#17A551' : 'rgba(47, 47, 47, 0.9)'}
            />

            <div className={(pwdState.pwdFocus && !pwdState.validPwd && pwdState.pwd) ? 'input-validation active-validation' : 'input-validation'}>
              <p className='input-validation-message'>Şifreniz en 8 harf, en az bir büyük harf ve özel karakter içermelidir.</p>
            </div>

          </div>

        </div>

        {/* CONFIRM PASSWORD INPUT */}
        <div className='register-input-group'>
          <label
            className='register-label'
            htmlFor='confirm-password'> Şifre Doğrulama
          </label>
          <div className='icon-input-group'>
            <input
              ref={confrimPwdRef}
              id='confirm-password'
              className='register-input'
              type='password'
              value={confirmPwdState.confirmPwd}
              onChange={(e) => confirmPwdDispatch({ type: CONFIRM_PWD_ACTION.SET_CONFIRM_PWD, payload: e.target.value })}
              required
              autoComplete='false'
              onFocus={() => confirmPwdDispatch({ type: CONFIRM_PWD_ACTION.SET_CONFIRM_FOCUS, payload: true })}
              onBlur={() => confirmPwdDispatch({ type: CONFIRM_PWD_ACTION.SET_CONFIRM_FOCUS, payload: false })}
            />

            <RiLockPasswordFill
              className='register-user-icon'
              size={iconSize}
              color={
                confirmPwdState.confirmPwd && (!confirmPwdState.matchPwd || !pwdState.validPwd) ? 'rgb(235, 7, 7)'
                  : confirmPwdState.confirmPwd && confirmPwdState.matchPwd && pwdState.validPwd ? '#17A551'
                    : 'rgba(47, 47, 47, 0.9)'
              } />

            <div className={(confirmPwdState.confirmFocus && !confirmPwdState.matchPwd && confirmPwdState.confirmPwd) ? 'input-validation active-validation' : 'input-validation'}>
              <p className='input-validation-message'>Şifre ve şifre doğrulamanın uyuşmaşı gerekmektedir !</p>
            </div>

          </div>

        </div>

        {/* FORM SUBMIT BUTTON */}
        <button type='submit' className='register-button'>Kaydol</button>

        {/* LOGIN PAGE LINK */}
        <p className='login-link-text'>Zaten Hesabın Var Mı ? <Link to={'/giris-yap'} className='login-link' >Giriş Yap</Link></p>

      </form>
    </div>
  )
}

export default Register
