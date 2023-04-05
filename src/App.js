import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import { authActions } from './store/auth';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(authActions.checkIsAuthenticated())
  }, [])
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  console.log("isAuth", isAuthenticated);
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          {isAuthenticated && <HomePage />}
          {!isAuthenticated && <Redirect to={"/login"} />}
        </Route>
        <Route path='/login'>
          {!isAuthenticated && <LoginPage />}
          {isAuthenticated && <Redirect to={"/"} />}
        </Route>
        <Route path='/signup'>
          {!isAuthenticated && <SignupPage />}
          {isAuthenticated && <Redirect to={"/"} />}
        </Route>
        <Route path='/profile'>
          {!isAuthenticated && <Redirect to={"/login"} />}
          {isAuthenticated && <ProfilePage />}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
