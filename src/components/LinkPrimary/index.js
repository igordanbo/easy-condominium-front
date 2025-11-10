import "./LinkPrimary.css";

export default function LinkPrimary({
  children,
  addClass,
  title,
  onClick,
  href,
}) {
  return (
    <a
      className={`easy-link-primary easy-link-primary-${addClass}`}
      title={title}
      onClick={onClick}
      href={href}
    >
      {children}
    </a>
  );
}
