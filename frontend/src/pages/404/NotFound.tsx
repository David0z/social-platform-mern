import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import styles from './NotFound.module.scss'

const NotFound = () => {
  const [count, setCount] = useState(10);
  const navigate = useNavigate()

  useEffect(() => {
    let countdown;

    countdown = setInterval(() => {
      setCount(prevCount => prevCount - 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count === 0) {
      navigate('/')
    }
  }, [count])

  return (
    <div className={styles.wrapper}>
      <h1>404 PAGE NOT FOUND</h1>
      <p>You will be redirected in {count} seconds...</p>
    </div>
  );
};

export default NotFound;
