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
                  <Route path="/manutencoes/manutencao/:id" element={<ViewMaintenance />} />
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
