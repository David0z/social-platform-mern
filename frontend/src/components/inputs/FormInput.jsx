import styles from "./FormInput.module.scss";

const FormInput = ({ name, type, label, value, onChange, ...props }) => {
  return (
    <div>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      <input
        type={type || "text"}
        value={value}
        name={name}
        onChange={onChange}
        className={styles.input}
        {...props}
      />
    </div>
  );
};

export default FormInput;
