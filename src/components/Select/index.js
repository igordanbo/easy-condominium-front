import "./Select.css";

export default function Select({
  label = "Selecione uma opção",
  defaultOptionText = "Selecione uma opção",
  defaultOptionValue = "",
  options,
  onChange,
  value,
}) {
  return (
    <div className="container-custom-select">
      <label>{label}</label>
      <select onChange={onChange} value={value}>
        <option value={defaultOptionValue}>{defaultOptionText}</option>
        {options?.map((option) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
}
