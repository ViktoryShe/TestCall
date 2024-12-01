import React from 'react';
import styles from './CallList.module.scss';

const ErrorState = ({ message }) => (
  <div className={styles.error}>
    <p>{message}</p>
  </div>
);

export default ErrorState;