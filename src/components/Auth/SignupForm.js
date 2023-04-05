import React, { useRef, useEffect } from 'react';
import logo from '../../assets/images/logo.png'
import styles from './LoginForm.module.css'
import Button from '../UI/Button/Button';
import { useHistory } from 'react-router-dom';
import { signupWithEmailAndPassword } from '../../core/Firebase/FirebaseMethods';
import LoadingSpinner from '../UI/Loader/LoadingSpinner'
import useHttp from '../../hooks/use-http'
import SocialForm from './SocialForm';
import { authActions } from '../../store/auth';
import { useDispatch } from 'react-redux';

const SignupForm = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const fullNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const { sendRequest, status, data, error } = useHttp(
    signupWithEmailAndPassword
  );

  const onSignupPageChange = () => {
    history.replace("/login")
  }
  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredFullName = fullNameRef.current.value
    const enteredEmail = emailRef.current.value
    const enteredPassword = passwordRef.current.value

    sendRequest({
      fullName: enteredFullName,
      email: enteredEmail,
      password: enteredPassword
    })
  }

  useEffect(() => {
    if (status === 'completed' && error === null) {
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
            <h2>Start from Scratch</h2>
            <p>Create account to continue.</p>
          </div>
          <SocialForm />
          <p className={styles['or-login-text']}>Or signup with e-mail</p>
          <form onSubmit={submitHandler}>
            <div className={`${styles['login-control']}`}>
              <label htmlFor={'fullname'}>{"Full name"}</label>
              <input
                type={'text'}
                id={'fullname'}
                ref={fullNameRef} />
            </div>
            <div className={`${styles['login-control']}`}>
              <label htmlFor={'email'}>{"E-mail address"}</label>
              <input
                type={'email'}
                id={'email'}
                ref={emailRef} />
            </div>
            <div className={`${styles['login-control']}`}>
              <label htmlFor={'password'}>{"Password"}</label>
              <input
                type={'password'}
                id={'password'}
                ref={passwordRef} />
            </div>
            {error && <div className={styles['error-message']}><p>*{error}</p></div>}
            <Button type={"submit"}>Signup</Button>
          </form>
          <div className={styles['signup-link']}>
            <p>Already have an account?</p>
            <p onClick={onSignupPageChange}>Login</p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SignupForm;
