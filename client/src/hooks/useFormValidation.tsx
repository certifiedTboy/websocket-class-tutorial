import { useState } from "react";

const useFormValidation = () => {
  const [formIsValid, setFormIsValid] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>(
    "All input fields are required"
  );

  const checkFormIsValid = (username: string, room: string) => {
    setFormIsValid(false);
    setFormError("");

    if (!username || !room) {
      setFormIsValid(false);
      return setFormError("Please fill in all fields");
    }

    setFormError("");
    return setFormIsValid(true);
  };

  return [formIsValid, formError, checkFormIsValid];
};

export default useFormValidation;
