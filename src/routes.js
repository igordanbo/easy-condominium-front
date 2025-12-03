import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { MenuProvider } from "./context/MenuContext";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import Loader from "./components/Loader";

import Template from "./pages/Template";
import Dashboard from "./pages/Dashboard";

import Maintenances from "./pages/Maintenances";
import ViewMaintenance from "./pages/Maintenances/View";
import AddMaintenance from "./pages/Maintenances/Add";

import Condos from "./pages/Condos";
import ViewCondo from "./pages/Condos/View";
import AddCondo from "./pages/Condos/Add";

function App() {
  return (
    <>
      <LoadingProvider>
        <MenuProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Loader />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Template />}>
                  <Route index element={<Dashboard />} />

                  <Route path="/manutencoes" element={<Maintenances />} />

                  <Route
                    path="/manutencoes/manutencao/:id"
                    element={<ViewMaintenance />}
                  />
                  <Route
                    path="/manutencoes/nova-manutencao"
                    element={<AddMaintenance />}
                  />

                  <Route path="/condominios" element={<Condos />} />
                  <Route
                    path="/condominios/condominio/:id"
                    element={<ViewCondo />}
                  />
                  <Route
                    path="/condominios/novo-condominio"
                    element={<AddCondo />}
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </LocalizationProvider>
        </MenuProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
