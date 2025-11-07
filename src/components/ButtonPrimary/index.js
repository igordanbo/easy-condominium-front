import "./ButtonPrimary.css";

export default function ButtonPrimary({
  children,
  addClass,
  title,
  onClick,
  disable,
}) {
  return (
    <button
      className={`easy-button-primary ${addClass}`}
      title={title}
      onClick={onClick}
      disable={disable}
    >
      {children}
    </button>
  );
}
