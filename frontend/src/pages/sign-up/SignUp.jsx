import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import FormInput from "../../components/inputs/FormInput";
import useForm from "../../hooks/useForm";
import styles from "./SignUp.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { signup, userActions } from "../../store/user/userSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const { isError, errorMessages } = useSelector((state) => state.user);
  const [validationError, setValidationError] = useState(null);
  const [fileName, setFileName] = useState(null);

  const { formValues, handleFormChange, setFormValues } = useForm({
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
    image: {
      value: "",
      isValid: true,
    },
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let userData = new FormData();

    for (const key in formValues) {
      userData.append(key, formValues[key].value);
    }

    dispatch(signup(userData));
  };

  useEffect(() => {
    return () => {
      dispatch(userActions.resetErrors());
    };
  }, []);

  const handleImageChange = (e) => {

    setValidationError(null);
    setFileName(null);

    if (e.target.files.length === 0) {
      setFormValues((prevState) => ({
        ...prevState,
        image: {
          ...prevState.image,
          value: null,
        },
      }));
      return;
    }

    const pickedFile = e.target.files[0];

    if (e.target.files.length > 1) {
      setValidationError("You can choose only one image at the time");
      return;
    }

    if (
      pickedFile.type !== "image/jpg" &&
      pickedFile.type !== "image/jpeg" &&
      pickedFile.type !== "image/png"
    ) {
      setValidationError(
        "Invalid file format, please select an image with .jpg, .jpeg or .png extention"
      );
      return;
    }

    if (pickedFile.size > 500000) {
      setValidationError("File cannot be larger than 500 Kb");
      return;
    }

    setFileName(pickedFile.name);

    setFormValues((prevState) => ({
      ...prevState,
      image: {
        ...prevState.image,
        value: e.target.files[0],
      },
    }));
  };

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
          name="image"
          label="Profile image (optional)"
          onChange={handleImageChange}
          customButton
          customButtonStyle={styles["form__file-btn"]}
          isError={validationError}
          errorMessage={validationError}
          fileName={fileName}
        />
        <Button className={styles.form__button}>SIGN UP</Button>
      </form>
    </div>
  );
};

export default SignUp;
