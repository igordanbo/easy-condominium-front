import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import { MenuProvider } from "./context/MenuContext";

import Template from "./pages/Template";
import Loader from "./components/Loader";

function App() {
  return (
    <>
      <LoadingProvider>
        <MenuProvider>
          <Loader />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Template />}></Route>
            </Routes>
          </BrowserRouter>
        </MenuProvider>
      </LoadingProvider>
    </>
  );
}

export default App;
