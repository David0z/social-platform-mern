import { useRef, useState } from "react";
import Button from "../button/Button";
import styles from "./FormInput.module.scss";

const FormInput = ({
  name,
  type,
  label,
  value,
  onChange,
  customButton,
  customButtonStyle,
  ...props
}) => {
  const inputRef = useRef();
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    onChange(e);
    if (e.target.files[0]?.name) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

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
            onChange={handleFileChange}
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
          className={styles.input}
          {...props}
        />
      )}
    </div>
  );
};

export default FormInput;
