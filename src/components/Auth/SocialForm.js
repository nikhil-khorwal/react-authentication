import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import facebook_logo from '../../assets/images/facebook_logo.png'
import google_logo from '../../assets/images/google_logo.png'
import { loginWithGoogle } from "../../core/Firebase/FirebaseMethods"
import useHttp from "../../hooks/use-http"
import { authActions } from "../../store/auth"
import LoadingSpinner from '../UI/Loader/LoadingSpinner'
import styles from './LoginForm.module.css'


const SocialForm = () => {
  const dispatch = useDispatch()
  const { sendRequest, data, error, status } = useHttp(
    loginWithGoogle
  )
  const googleHandler = () => {
    sendRequest()
  }
  useEffect(() => {
    if (status === 'completed' && error === null) {
      dispatch(authActions.login())
    }
  }, [status])

  return <React.Fragment>
    {status === 'pending' && <LoadingSpinner />}
    <div className={styles['social-buttons']}>
      <button className={styles['social-button']}>
        <img src={facebook_logo} alt={"logo"} />facebook
      </button>
      <button className={styles['social-button']} onClick={googleHandler}>
        <img src={google_logo} alt={"logo"} />google
      </button>
    </div>
  </React.Fragment>
}

export default SocialForm