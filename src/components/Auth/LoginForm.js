import logo from '../../assets/images/logo.png'
import styles from './LoginForm.module.css'
import Button from '../UI/Button/Button';
import React, { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { loginWithEmailAndPassword } from '../../core/Firebase/FirebaseMethods';
import LoadingSpinner from '../UI/Loader/LoadingSpinner';
import { useEffect, useState } from 'react';
import SocialForm from './SocialForm';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';

const LoginForm = (props) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [rememberMe, setRememberMe] = useState(false)
  const [lastEmail, setLastEmail] = useState(null)

  const { sendRequest, data, error, status } = useHttp(
    loginWithEmailAndPassword
  )


  useEffect(() => {
    const email = localStorage.getItem('storedEmail')
    if (email) {
      setLastEmail(email)
      setRememberMe(true)
    }
  }, [])



  const rememberMeHandler = (event) => {
    setRememberMe(event.target.checked)
  }
  const onLoginPageChange = () => {
    history.replace("/signup")
  }
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value

    props.onSubmitTap()
    sendRequest({
      email: enteredEmail,
      password: enteredPassword,
      rememberMe: rememberMe
    })
  }
  useEffect(() => {
    if (status === 'completed' && error === null) {
      console.log(status);
      dispatch(authActions.login())
    }
  }, [status])

  return (
    <React.Fragment>
      {status === 'pending' && <LoadingSpinner />}
      <div className={styles['login-form']}>
        <div className={styles['card']}>
          <div className={styles['login-img']}>
            <img src={logo} alt={"logo"} />
          </div>
          <div className={styles['summary']}>
            <h2>Welcome Back!</h2>
            <p>Please login to continue.</p>
          </div>
          <SocialForm />
          <p className={styles['or-login-text']}>Or log in with e-mail</p>
          <form onSubmit={submitHandler}>
            <div className={`${styles['login-control']}`}>
              <label htmlFor={'email'}>{"E-mail address"}</label>
              <input
                type={'email'}
                id={'email'}
                value={lastEmail && lastEmail}
                ref={emailRef} />
            </div>
            <div className={`${styles['login-control']}`}>
              <label htmlFor={'password'}>{"Password"}</label>
              <input
                type={'password'}
                id={'password'}
                ref={passwordRef} />
            </div>
            <div className={styles['reset-links']}>
              <div className={styles['remember-me-input']}>
                <input type={"checkbox"} id={"rememberMe"} onChange={rememberMeHandler} checked={rememberMe} />
                <label htmlFor='rememberMe'>Remember Me</label>
              </div>
              <a>Forgot password?</a>
            </div>
            {error && <div className={styles['error-message']}><p>*{error}</p></div>}
            <Button type={"submit"}>Login</Button>
          </form>
          <div className={styles['signup-link']}>
            <p>Don't have an account?</p>
            <p onClick={onLoginPageChange}>Sign up</p>
          </div>
        </div></div>
    </React.Fragment>
  );
}

export default LoginForm;
