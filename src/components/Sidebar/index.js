import React, { useState } from "react";

import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import LineAxisIcon from "@mui/icons-material/LineAxis";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import HandymanIcon from "@mui/icons-material/Handyman";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import ApiIcon from "@mui/icons-material/Api";
import PublicIcon from "@mui/icons-material/Public";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CampaignIcon from "@mui/icons-material/Campaign";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

import { useMenu } from "../../context/MenuContext";
import "./Sidebar.css";

export default function Sidebar() {
  const { menuIsOpen, showMenu, hideMenu } = useMenu();

  const [active, setActive] = useState("dashboard");

  const toggleMenu = () => {
    if (menuIsOpen) hideMenu();
    else showMenu();
  };

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LineAxisIcon />,
      badge: false,
    },
    {
      id: "users",
      label: "Usuários",
      icon: <PersonSearchIcon />,
      badge: false,
    },
    {
      id: "condos",
      label: "Condomínios",
      icon: <WorkspacesIcon />,
      badge: false,
    },
    {
      id: "maintenance",
      label: "Manutenções",
      icon: <HandymanIcon />,
      badge: false,
    },
    {
      id: "admins",
      label: "Administradores",
      icon: <AdminPanelSettingsIcon />,
      badge: false,
    },
    {
      id: "settings",
      label: "Configurações",
      icon: <SettingsSuggestIcon />,
      badge: false,
    },
    { id: "api", label: "Easy API", icon: <ApiIcon />, badge: true },
    {
      id: "public-area",
      label: "Área pública",
      icon: <PublicIcon />,
      badge: false,
    },
    {
      id: "warmings",
      label: "Mural",
      icon: <ErrorOutlineIcon />,
      badge: false,
    },
    {
      id: "reports",
      label: "Relatórios",
      icon: <AttachFileIcon />,
      badge: false,
    },
    {
      id: "finance",
      label: "Financeiro",
      icon: <CurrencyExchangeIcon />,
      badge: false,
    },
    {
      id: "ombudsman",
      label: "Ouvidoria",
      icon: <CampaignIcon />,
      badge: false,
    },
    {
      id: "requests",
      label: "Chamados",
      icon: <WarningAmberIcon />,
      badge: false,
    },
  ];

  return (
    <aside
      className={`sidebar ${menuIsOpen ? "sidebar-open" : "sidebar-collapsed"}`}
    >
      {/* Header */}
      <div className="sidebar-header">
        <h1 className="sidebar-title">
          <svg
            width="118"
            height="39"
            viewBox="0 0 118 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <path
              d="M15 2H24C31.1797 2 37 7.8203 37 15V24C37 31.1797 31.1797 37 24 37H15C7.8203 37 2 31.1797 2 24V15C2 7.8203 7.8203 2 15 2Z"
              stroke="#A06FAF"
              strokeWidth="4"
            />{" "}
            <path
              d="M49.642 30V8.18182H62.8097V10.5256H52.2841V17.8977H62.1278V20.2415H52.2841V27.6562H62.9801V30H49.642ZM71.0462 30.3835C70.0092 30.3835 69.0682 30.1882 68.223 29.7976C67.3778 29.3999 66.7067 28.8281 66.2095 28.0824C65.7124 27.3295 65.4638 26.4205 65.4638 25.3551C65.4638 24.4176 65.6484 23.6577 66.0178 23.0753C66.3871 22.4858 66.8807 22.0241 67.4986 21.6903C68.1165 21.3565 68.7983 21.108 69.544 20.9446C70.2969 20.7741 71.0533 20.6392 71.8132 20.5398C72.8075 20.4119 73.6136 20.3161 74.2315 20.2521C74.8565 20.1811 75.3111 20.0639 75.5952 19.9006C75.8864 19.7372 76.032 19.4531 76.032 19.0483V18.9631C76.032 17.9119 75.7443 17.0952 75.169 16.5128C74.6009 15.9304 73.7379 15.6392 72.5803 15.6392C71.38 15.6392 70.4389 15.902 69.7571 16.4276C69.0753 16.9531 68.5959 17.5142 68.3189 18.1108L65.9325 17.2585C66.3587 16.2642 66.9268 15.4901 67.6371 14.9361C68.3544 14.375 69.1357 13.9844 69.9808 13.7642C70.8331 13.5369 71.6712 13.4233 72.495 13.4233C73.0206 13.4233 73.6243 13.4872 74.3061 13.6151C74.995 13.7358 75.6591 13.9879 76.2983 14.3714C76.9446 14.755 77.4808 15.3338 77.907 16.108C78.3331 16.8821 78.5462 17.919 78.5462 19.2188V30H76.032V27.7841H75.9041C75.7337 28.1392 75.4496 28.5192 75.0518 28.924C74.6541 29.3288 74.125 29.6733 73.4645 29.9574C72.804 30.2415 71.9979 30.3835 71.0462 30.3835ZM71.4297 28.125C72.424 28.125 73.2621 27.9297 73.9439 27.5391C74.6328 27.1484 75.1513 26.6442 75.4993 26.0263C75.8544 25.4084 76.032 24.7585 76.032 24.0767V21.7756C75.9254 21.9034 75.6911 22.0206 75.3288 22.1271C74.9737 22.2266 74.5618 22.3153 74.093 22.3935C73.6314 22.4645 73.1804 22.5284 72.7401 22.5852C72.3068 22.6349 71.9553 22.6776 71.6854 22.7131C71.032 22.7983 70.4212 22.9368 69.853 23.1286C69.2919 23.3132 68.8374 23.5937 68.4893 23.9702C68.1484 24.3395 67.978 24.8437 67.978 25.483C67.978 26.3565 68.3011 27.017 68.9474 27.4645C69.6009 27.9048 70.4283 28.125 71.4297 28.125ZM93.726 17.3011L91.4675 17.9403C91.3255 17.5639 91.1159 17.1982 90.839 16.843C90.5691 16.4808 90.1998 16.1825 89.731 15.9482C89.2623 15.7138 88.6621 15.5966 87.9306 15.5966C86.9292 15.5966 86.0946 15.8274 85.427 16.2891C84.7665 16.7436 84.4363 17.3224 84.4363 18.0256C84.4363 18.6506 84.6635 19.1442 85.1181 19.5064C85.5726 19.8686 86.2828 20.1705 87.2488 20.4119L89.6777 21.0085C91.1408 21.3636 92.231 21.907 92.9483 22.6385C93.6657 23.3629 94.0243 24.2969 94.0243 25.4403C94.0243 26.3778 93.7544 27.2159 93.2147 27.9545C92.682 28.6932 91.9363 29.2756 90.9775 29.7017C90.0186 30.1278 88.9036 30.3409 87.6323 30.3409C85.9632 30.3409 84.5819 29.9787 83.4881 29.2543C82.3944 28.5298 81.7019 27.4716 81.4107 26.0795L83.7971 25.483C84.0243 26.3636 84.454 27.0241 85.0861 27.4645C85.7253 27.9048 86.5598 28.125 87.5897 28.125C88.7615 28.125 89.6919 27.8764 90.3809 27.3793C91.0769 26.875 91.4249 26.2713 91.4249 25.5682C91.4249 25 91.226 24.5241 90.8283 24.1406C90.4306 23.75 89.8198 23.4588 88.9959 23.267L86.2686 22.6278C84.7701 22.2727 83.6692 21.7223 82.9661 20.9766C82.2701 20.2237 81.9221 19.2827 81.9221 18.1534C81.9221 17.2301 82.1813 16.4134 82.6998 15.7031C83.2253 14.9929 83.9391 14.4354 84.8411 14.0305C85.7502 13.6257 86.78 13.4233 87.9306 13.4233C89.5499 13.4233 90.8212 13.7784 91.7445 14.4886C92.6749 15.1989 93.3354 16.1364 93.726 17.3011ZM98.4283 36.1364C98.0021 36.1364 97.6222 36.1009 97.2884 36.0298C96.9545 35.9659 96.7237 35.902 96.5959 35.8381L97.2351 33.6222C97.8459 33.7784 98.3857 33.8352 98.8544 33.7926C99.3232 33.75 99.7386 33.5405 100.101 33.1641C100.47 32.7947 100.808 32.1946 101.113 31.3636L101.582 30.0852L95.5305 13.6364H98.2578L102.775 26.6761H102.945L107.462 13.6364H110.19L103.244 32.3864C102.931 33.2315 102.544 33.9311 102.082 34.4851C101.621 35.0462 101.085 35.4616 100.474 35.7315C99.87 36.0014 99.1882 36.1364 98.4283 36.1364Z"
              fill="#344054"
            />{" "}
            <path
              d="M114.895 30.3409C114.071 30.3409 113.364 30.0533 112.775 29.478C112.192 28.8956 111.904 28.1889 111.912 27.358C111.904 26.5483 112.192 25.8558 112.775 25.2805C113.364 24.7053 114.071 24.4176 114.895 24.4176C115.676 24.4176 116.365 24.7053 116.961 25.2805C117.565 25.8558 117.87 26.5483 117.877 27.358C117.87 27.9119 117.725 28.4162 117.441 28.8707C117.164 29.3182 116.801 29.6768 116.354 29.9467C115.907 30.2095 115.42 30.3409 114.895 30.3409Z"
              fill="#A06FAF"
            />{" "}
            <path
              d="M30.8332 11L16.6248 27.5L10.1665 20"
              stroke="#A06FAF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />{" "}
          </svg>
        </h1>
      </div>

      {/* Menu */}
      <nav className="sidebar-menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                className={`sidebar-menu-item ${
                  active === item.id ? "sidebar-active" : ""
                }`}
                onClick={() => setActive(item.id)}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span
                  className={`sidebar-label ${
                    menuIsOpen ? "" : "sidebar-hidden"
                  }`}
                >
                  {item.label}
                </span>
                {item.badge && (
                  <span
                    className={`sidebar-badge ${
                      menuIsOpen ? "" : "sidebar-hidden"
                    }`}
                  >
                    Novo
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botão de toggle */}
      <div className="sidebar-menu-btn">
        <button
          className={`sidebar-toggle-btn ${
            menuIsOpen ? "sidebar-on" : "sidebar-off"
          }`}
          onClick={toggleMenu}
        >
          <span className="sidebar-switch">
            <span className="sidebar-knob"></span>
          </span>
        </button>
      </div>
    </aside>
  );
}
