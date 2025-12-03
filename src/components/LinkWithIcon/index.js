import { Link } from "react-router-dom";
import "./LinkWithIcon.css";
export default function LinkWithIcon({
  children,
  to,
  addClass,
  type,
  onClick,
}) {
  return (
    <Link
      to={to}
      className={`easy-link-with-icon easy-link-with-icon-${addClass}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </Link>
  );
}
