import "./ButtonPrimary.css";

export default function ButtonPrimary({
  children,
  addClass,
  title,
  onClick,
  disabled,
}) {
  return (
    <button
      className={`easy-button-primary easy-button-primary-${addClass} disabled-${disabled}`}
      title={title}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
