import { useEffect, useState } from "react";
import api from "../../utils/api";
import { useLoading } from "../../context/LoadingContext";
import Table from "../Table";
import TableHeader from "../TableHeader";
import TableItem from "../TableItem";
import TableItemEmpty from "../TableItemEmpty";
import TableFooter from "../TableFooter";
import "./styles.css";
import ModuleTitleClip from "../ModuleTitleClip";

export default function GridDashboard() {
  //maintenances
  const [maintenances, setMaintenances] = useState([]);
  const [currentPageMaintenances, setCurrentPageMaintenances] = useState(1);
  const [totalItemsMaintenances, setTotalItemsMaintenances] = useState(0);
  const [perPageMaintenances, setPerPageMaintenances] = useState(0);
  const [nextPageUrlMaintenances, setNextPageUrlMaintenances] = useState(null);
  const [prevPageUrlMaintenances, setPrevPageUrlMaintenances] = useState(null);

  //condos
  const [condos, setCondos] = useState([]);
  const [currentPageCondos, setCurrentPageCondos] = useState(1);
  const [totalItemsCondos, setTotalItemsCondos] = useState(0);
  const [perPageCondos, setPerPageCondos] = useState(0);
  const [nextPageUrlCondos, setNextPageUrlCondos] = useState(null);
  const [prevPageUrlCondos, setPrevPageUrlCondos] = useState(null);

  const { showLoading, hideLoading } = useLoading();

  const loadPageMaintenances = async (url = "/manutencaos") => {
    try {
      showLoading();

      const response = await api.get(url);
      const res = response.data;

      setMaintenances(res.data);
      setCurrentPageMaintenances(res.current_page);
      setTotalItemsMaintenances(res.total);
      setPerPageMaintenances(res.per_page);
      setNextPageUrlMaintenances(res.next_page_url);
      setPrevPageUrlMaintenances(res.prev_page_url);
    } catch (error) {
      console.error("Erro ao buscar manutenções:", error);
    } finally {
      hideLoading();
    }
  };

  const loadPageCondos = async (url = "/condominios") => {
    try {
      showLoading();

      const response = await api.get(url);
      const res = response.data;

      setCondos(res.data);
      setCurrentPageCondos(res.current_page);
      setTotalItemsCondos(res.total);
      setPerPageCondos(res.per_page);
      setNextPageUrlCondos(res.next_page_url);
      setPrevPageUrlCondos(res.prev_page_url);
    } catch (error) {
      console.error("Erro ao buscar manutenções:", error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    loadPageMaintenances();
    loadPageCondos();
  }, []);

  return (
    <section className="container-grid-dashboard-page">
      <div className="container-box-inner-grid-dashboard-page">
        <ModuleTitleClip title={`Manutenções Programadas`} />
        <Table>
          <TableHeader columns="2" col1="Tipo" col2="Condomínio" />

          {maintenances?.length > 0 ? (
            maintenances?.map((maintenance) => (
              <TableItem
                key={maintenance?.id}
                columns="2"
                col1={maintenance?.tipo?.nome}
                col2={maintenance?.condominio?.nome}
                actions={true}
                action_view={true}
                action_edit={false}
                action_delete={false}
              />
            ))
          ) : (
            <TableItemEmpty />
          )}

          <TableFooter
            prev={prevPageUrlMaintenances !== null}
            next={nextPageUrlMaintenances !== null}
            totalItems={totalItemsMaintenances}
            currentPage={currentPageMaintenances}
            perPage={perPageMaintenances}
            onClickPrev={() =>
              prevPageUrlMaintenances &&
              loadPageMaintenances(prevPageUrlMaintenances)
            }
            onClickNext={() =>
              nextPageUrlMaintenances &&
              loadPageMaintenances(nextPageUrlMaintenances)
            }
          />
        </Table>
      </div>

      <div className="container-box-inner-grid-dashboard-page">
        <ModuleTitleClip title={`Condomínios`} />
        <Table>
          <TableHeader columns="3" col1="Condomínio" col2="Síndico" col3="Contato" />

          {condos?.length > 0 ? (
            condos?.map((condo) => (
              <TableItem
                key={condo?.id}
                columns="3"
                col1={condo?.nome}
                col2={condo?.sindico?.nome}
                col3={condo?.telefone}
                actions={true}
                action_view={true}
                action_edit={false}
                action_delete={false}
              />
            ))
          ) : (
            <TableItemEmpty />
          )}

          <TableFooter
            prev={prevPageUrlCondos !== null}
            next={nextPageUrlCondos !== null}
            totalItems={totalItemsCondos}
            currentPage={currentPageCondos}
            perPage={perPageCondos}
            onClickPrev={() =>
              prevPageUrlCondos && loadPageCondos(prevPageUrlCondos)
            }
            onClickNext={() =>
              nextPageUrlCondos && loadPageCondos(nextPageUrlCondos)
            }
          />
        </Table>
      </div>

      {/* Debug manutenções 

      {maintenances.map((item) => (
        <pre key={item.id}>{JSON.stringify(item, null, 2)}</pre>
      ))}

      */}
    </section>
  );
}
