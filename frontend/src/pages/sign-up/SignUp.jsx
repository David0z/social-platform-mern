import Button from "../../components/button/Button";
import FormInput from "../../components/inputs/FormInput";
import useForm from "../../hooks/useForm";
import styles from "./SignUp.module.scss";

const SignUp = () => {
  const { formValues, handleFormChange } = useForm({
    email: {
      value: '',
      isValid: true
    },
    password: {
      value: '',
      isValid: true
    },
    nickname: {
      value: '',
      isValid: true
    },
    photo: {
      value: '',
      isValid: true
    }
  });

  return (
    <div className={styles.signup}>
      <h1 className={styles.signup__title}>Sign Up</h1>
      <div className={styles.form}>
        <FormInput required type='email' name="email" label="Email" value={formValues.email.value} onChange={handleFormChange} />
        <FormInput required type='password' name="password" label="Password" value={formValues.password.value} onChange={handleFormChange} />
        <FormInput required name="nickname" label="Nickname" value={formValues.nickname.value} onChange={handleFormChange} />
        <FormInput type='file' name="photo" label="Profile photo (optional)" value={formValues.photo.value} onChange={handleFormChange} />
        {/* Add customizable file button for input with type of file */}
        <Button className={styles.form__button} onClick={() => console.log('hello')}>
          SIGN UP
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
