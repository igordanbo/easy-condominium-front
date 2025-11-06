import { Outlet } from "react-router-dom";

import Header from "../../components/Header";
import MainContainer from "../../components/MainContainer";
import Sidebar from "../../components/Sidebar";
import Loader from "../../components/Loader";

export default function Template() {
  return (
    <>
      <Sidebar />
      <Header />
      <MainContainer>
        <Outlet />
      </MainContainer>
    </>
  );
}
