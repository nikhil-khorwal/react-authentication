import { getFirebaseUser } from '../../core/Firebase/FirebaseMethods';
import useHttp from '../../hooks/use-http';
import React, { useEffect } from 'react';
import classes from './StartingPageContent.module.css';
import LoadingSpinner from '../UI/Loader/LoadingSpinner';

const StartingPageContent = () => {

  return (
    <React.Fragment>
      <section className={classes.starting}>
        <h1>{"Welcome"}</h1>
      </section>
    </React.Fragment>
  );
};

export default StartingPageContent;
