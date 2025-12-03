import "./Select.css";

export default function Select({ label = "Selecione uma opção", options, onChange, value }) {
  return (
    <div className="container-custom-select">
      <label>{label}</label>
      <select onChange={onChange} value={value}>
        {options?.map((option) => (
          <option key={option?.value} value={option?.value}>
            {option?.label}
          </option>
        ))}
      </select>
    </div>
  );
}
