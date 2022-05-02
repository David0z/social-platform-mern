import Button from "../../components/button/Button";
import FormInput from "../../components/inputs/FormInput";
import useForm from "../../hooks/useForm";
import styles from "./Login.module.scss";

const Login = () => {
  const { formValues, handleFormChange } = useForm({
    email: {
      value: '',
      isValid: true
    },
    password: {
      value: '',
      isValid: true
    }
  });

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      <div className={styles.form}>
        <FormInput required type='email' name="email" label="Email" value={formValues.email.value} onChange={handleFormChange} />
        <FormInput required type='password' name="password" label="Password" value={formValues.password.value} onChange={handleFormChange} />
        <Button className={styles.form__button} onClick={() => console.log('hello')}>
          LOGIN
        </Button>
      </div>
    </div>
  )
}

export default Login