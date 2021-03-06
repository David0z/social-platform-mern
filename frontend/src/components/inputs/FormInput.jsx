import { useRef, useState } from "react";
import Button from "../button/Button";
import styles from "./FormInput.module.scss";
import { Icon } from "@iconify/react";
import ErrorMessage from "../error-message/ErrorMessage";

const FormInput = ({
  name,
  type,
  label,
  value,
  onChange,
  customButton,
  customButtonStyle,
  isError,
  errorMessage,
  fileName,
  ...props
}) => {
  const inputRef = useRef();

  return (
    <div>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}

      {customButton ? (
        <>
          <input
            ref={inputRef}
            type={type || "text"}
            value={value}
            name={name}
            onChange={onChange}
            style={{ display: "none" }}
            {...props}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              inputRef.current.click();
            }}
            className={customButtonStyle}
          >
            Choose file
          </Button>
          <p className={styles["custom-label"]} title={fileName}>
            {fileName && fileName.length > 20
              ? `${fileName.slice(0, 20)}...`
              : fileName}
          </p>
        </>
      ) : (
        <input
          type={type || "text"}
          value={value}
          name={name}
          onChange={onChange}
          className={`${styles.input} ${
            isError && errorMessage !== "" && styles["input--error"]
          }`}
          {...props}
        />
      )}

      {isError && errorMessage !== "" && (
        <ErrorMessage
          message={errorMessage}
          className={styles["error-wrapper"]}
        />
      )}
    </div>
  );
};

export default FormInput;
