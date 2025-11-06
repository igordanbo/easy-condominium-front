import "./Header.css";

import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

export default function Header({}) {
  return (
    <header className="header-container">
      <p>
        Olá. Seja bem vindo ao Easy Condominium. Pressione <span>F1</span> para
        instruções.
      </p>

      <div className="header-btn-icon header-btn-person-icon">
        <PersonIcon />
      </div>
      <div className="header-btn-icon header-btn-logout-icon">
        <LogoutIcon />
      </div>
    </header>
  );
}
