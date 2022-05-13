import styles from './Button.module.scss'

const Button = ({children, className, onClick, ...props}) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button