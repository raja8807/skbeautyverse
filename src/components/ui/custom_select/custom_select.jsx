import styles from './custom_select.module.scss'

const CustomSelect = (props) => {
  const { options = [] } = props;

  return (
    <select className={styles.customSelect}>
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default CustomSelect;
