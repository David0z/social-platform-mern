import { useState } from "react";

const useForm = ( initialState ) => {
  const [formValues, setFormValues] = useState(initialState);

  const handleFormChange = (e) => {
    setFormValues((prevState) => ({
      ...prevState,
      [e.target.name]: {
        ...prevState[e.target.name],
        value: e.target.value,
      },
    }));
  };

  return { formValues, handleFormChange };
};

export default useForm;
