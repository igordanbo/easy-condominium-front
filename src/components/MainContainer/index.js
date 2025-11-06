import "./MainContainer.css";

import { useMenu } from "../../context/MenuContext";

export default function MainContainer({ children }) {
  const { menuIsOpen } = useMenu();

  return <main className={`main-container ${menuIsOpen ? 'main-container-menu-is-open' : 'main-container-menu-is-close'}`}>{children}</main>;
}
