import Modal from '../Modal/Modal';
import classes from './LoadingSpinner.module.css';

const LoadingSpinner = () => {
  return <Modal><div className={classes.spinner}></div></Modal>;
}

export default LoadingSpinner;
