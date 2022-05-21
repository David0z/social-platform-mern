import ReactDOM from 'react-dom';
import styles from './Modal.module.scss'

const Modal = ({children, onClose}) => {
  const content = (
    <div className={styles.wrapper} onClick={onClose}>
      {children}
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById('modal'))
}

export default Modal