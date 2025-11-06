import { createContext, useState, useContext } from "react";

const MenuContext = createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export function MenuProvider({ children }) {
  const [menuIsOpen, setMenuIsOpen] = useState(true);

  const showMenu = () => setMenuIsOpen(true);
  const hideMenu = () => setMenuIsOpen(false);

  return (
    <MenuContext.Provider value={{ menuIsOpen, showMenu, hideMenu }}>
      {children}
    </MenuContext.Provider>
  );
}
