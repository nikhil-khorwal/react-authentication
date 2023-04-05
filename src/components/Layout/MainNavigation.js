import { Link } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';
import { logoutFirebase } from '../../core/Firebase/FirebaseMethods';
import useHttp from '../../hooks/use-http';
import { useEffect } from 'react'
import LoadingSpinner from '../UI/Loader/LoadingSpinner';

const MainNavigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  const dispatch = useDispatch()
  const { sendRequest, data, error, status } = useHttp(
    logoutFirebase
  )
  const logoutHandler = () => {
    sendRequest()
  }
  useEffect(() => {
    if (status === 'completed' && error === null) {
      dispatch(authActions.logout())
    }
    console.log(status);
  }, [status]);


  return (

    <header className={classes.header}>
      {status === 'pending' && <LoadingSpinner />}
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      {isAuthenticated &&
        <nav>
          <ul>
            <li>
              <Link to='/profile'>Profile</Link>
            </li>
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>}
    </header>
  );
};

export default MainNavigation;
