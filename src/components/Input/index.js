import "./Input.css";

export default function Input({
  label = "Insira o campo",
  type = "text",
  value,
  placeholder = "Insira o campo",
  required = false
}) {
  return (
    <div className="easy-container-custom-input">
      <label>{label} {required ? <span className="easy-required-custom-input">*</span> : ""}</label>
      <input type={type} value={value} placeholder={placeholder} required={required}></input>
    </div>
  );
}
