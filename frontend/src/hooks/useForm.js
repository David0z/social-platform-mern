import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userActions } from '../store/user/userSlice'

const useForm = (initialState) => {
  const [formValues, setFormValues] = useState(initialState);
  const { isError, errorMessages } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleFormChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: {
        ...prevState[e.target.name],
        value: e.target.value,
      },
    }));

    if (isError && errorMessages[e.target.name] !== "") {
      dispatch(userActions.resetSingleError(e.target.name))
    }
  };

  return { formValues, handleFormChange };
};

export default useForm;
