import { useEffect } from "react";
import Button from "../../components/button/Button";
import FormInput from "../../components/inputs/FormInput";
import useForm from "../../hooks/useForm";
import styles from "./SignUp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signup, userActions } from "../../store/user/userSlice";

const SignUp = () => {
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
    name: {
      value: "",
      isValid: true,
    },
    photo: {
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

    dispatch(signup(userData));
  };

  useEffect(() => {
    return () => {
      dispatch(userActions.resetErrors());
    };
  }, []);

  return (
    <div className={styles.signup}>
      <h1 className={styles.signup__title}>Sign Up</h1>
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
        <FormInput
          required
          name="name"
          label="Nickname"
          value={formValues.name.value}
          onChange={handleFormChange}
          isError={isError}
          errorMessage={errorMessages.name}
        />
        <FormInput
          type="file"
          name="photo"
          label="Profile photo (optional)"
          value={formValues.photo.value}
          onChange={handleFormChange}
          customButton={true}
          customButtonStyle={styles["form__file-btn"]}
        />
        <Button className={styles.form__button}>SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUp;
