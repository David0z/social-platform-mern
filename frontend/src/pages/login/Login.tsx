import { useDispatch, useSelector } from "react-redux";
import { login, userActions } from "../../store/user/userSlice";
import Button from "../../components/button/Button";
import FormInput from "../../components/inputs/FormInput";
import useForm from "../../hooks/useForm";
import styles from "./Login.module.scss";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const { isError, errorMessages } = useSelector((state) => state.user);

  const { formValues, handleFormChange } = useForm({
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let userData = {};

    for (const key in formValues) {
      userData[key] = formValues[key].value;
    }

    dispatch(login(userData));
  };

  useEffect(() => {
    return () => {
      dispatch(userActions.resetErrors());
    };
  }, []);

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      <form className={styles.form} onSubmit={handleFormSubmit}>
        <FormInput
          required
          type="email"
          name="email"
          label="Email"
          value={formValues.email.value}
          onChange={handleFormChange}
          isError={isError}
          errorMessage={errorMessages.email}
        />
        <FormInput
          required
          type="password"
          name="password"
          label="Password"
          value={formValues.password.value}
          onChange={handleFormChange}
          isError={isError}
          errorMessage={errorMessages.password}
        />
        <Button className={styles.form__button}>LOGIN</Button>
      </form>
    </div>
  );
};

export default Login;
