import { getFirebaseUser } from '../../core/Firebase/FirebaseMethods';
import useHttp from '../../hooks/use-http';
import React, { useEffect } from 'react';
import LoadingSpinner from '../UI/Loader/LoadingSpinner';

import classes from './UserProfile.module.css';

const UserProfile = () => {
  const { sendRequest, data, status, error } = useHttp(getFirebaseUser, true)

  useEffect(() => {
    sendRequest()
  }, [])

  let content = ""
  if (data) {
    if (data.displayName != null) {
      content = <h1>{data.displayName}</h1>
    }
    else {
      content = <h1>{"Guest"}</h1>
    }
  }

  return (
    <React.Fragment>
      {status === 'pending' && <LoadingSpinner />}
      <section className={classes.profile}>
        {content}
      </section>
    </React.Fragment>
  );
};

export default UserProfile;
