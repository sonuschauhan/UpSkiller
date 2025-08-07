import React from 'react';
import styles from '../styles/NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.code}>404</h1>
      <p className={styles.message}>Page Not Found</p>
      <Link to="/" className={styles.button}>
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
