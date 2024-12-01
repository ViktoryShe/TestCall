import React from 'react';
import styles from './CallList.module.scss';

const LoadingState = () => (
  <div className={styles.loading}>
    <div className={styles.spinner}></div>
    <p>Загрузка звонков...</p>
  </div>
);

export default LoadingState;