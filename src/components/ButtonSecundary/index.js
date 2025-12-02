import "./ButtonSecundary.css";

export default function ButtonSecundary({
  children,
  addClass,
  title,
  onClick,
  disable,
}) {
  return (
    <button
      className={`easy-button-secundary ${addClass}`}
      title={title}
      onClick={onClick}
      disable={disable}
    >
      {children}
    </button>
  );
}
