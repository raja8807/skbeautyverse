import styles from "./custom_select.module.scss";

const CustomSelect = (props) => {
  const { options = [], value, onChange = () => {} } = props;

  return (
    <select
      className={styles.customSelect}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
      
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
