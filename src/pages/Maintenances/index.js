import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";

import api from "../../utils/api";
import renderStatus from "../../utils/renderStatus";

import "./Maintenances.css";

import ButtonPrimary from "../../components/ButtonPrimary";
import LinkPrimary from "../../components/LinkPrimary";
import ModuleTitleClip from "../../components/ModuleTitleClip";
import Table from "../../components/Table";
import TableItem from "../../components/TableItem";
import TableItemEmpty from "../../components/TableItemEmpty";
import TableFooter from "../../components/TableFooter";
import TableHeader from "../../components/TableHeader";
import { useNavigate } from "react-router-dom";

export default function Maintenances() {
  const { showLoading, hideLoading } = useLoading();

  //maintenances
  const [maintenances, setMaintenances] = useState([]);
  const [currentPageMaintenances, setCurrentPageMaintenances] = useState(1);
  const [totalItemsMaintenances, setTotalItemsMaintenances] = useState(0);
  const [perPageMaintenances, setPerPageMaintenances] = useState(0);
  const [nextPageUrlMaintenances, setNextPageUrlMaintenances] = useState(null);
  const [prevPageUrlMaintenances, setPrevPageUrlMaintenances] = useState(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    loadPageMaintenances();
  }, []);

  return (
    <section>
      {" "}
      <div className="container-box-inner-grid-dashboard-page">
        <ModuleTitleClip title={`Manutenções Programadas`} />
        <Table>
          <TableHeader
            columns="5"
            col1="Tipo"
            col2="Condomínio"
            col3="Data agendada"
            col4="Data de conclusão"
            col5="Status"
          />

          {maintenances?.length > 0 ? (
            maintenances?.map((maintenance) => (
              <TableItem
                key={maintenance?.id}
                columns="5"
                col1={maintenance?.tipo?.nome}
                col2={maintenance?.condominio?.nome}
                col3={
                  maintenance?.data_agendada !== null
                    ? maintenance?.data_agendada
                    : "Não agendada"
                }
                col4={
                  maintenance?.data_conclusao !== null
                    ? maintenance?.data_conclusao
                    : "Não concluída"
                }
                col5={renderStatus(maintenance?.status)}

                actions={true}
                action_view={true}
                action_edit={false}
                action_delete={false}

                onClickView={() => {
                  navigate(`/manutencoes/manutencao/${maintenance?.id}`)
                }}
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
    </section>
  );
}
