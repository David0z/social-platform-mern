import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import styles from './Modal.module.scss'

const Modal = ({children, onClose}) => {

  useEffect(() => {
    return () => onClose()
  }, [])
  
  const content = (
    <div className={styles.wrapper} onClick={onClose}>
      {children}
      <button className={styles.button} onClick={onClose}/>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'))
}

export default Modal