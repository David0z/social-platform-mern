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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    console.log('Form Submited');
  }

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <FormInput required type='email' name="email" label="Email" value={formValues.email.value} onChange={handleFormChange} />
        <FormInput required type='password' name="password" label="Password" value={formValues.password.value} onChange={handleFormChange} />
        <Button className={styles.form__button}>
          LOGIN
        </Button>
      </form>
    </div>
  )
}

export default Login