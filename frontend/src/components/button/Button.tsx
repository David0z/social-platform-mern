import styles from './Button.module.scss'
import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode,
  className: string,
  onClick: () => void
}

const Button: FC<ButtonProps> = ({children, className, onClick, ...props}) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button