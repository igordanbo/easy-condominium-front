import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";

import api from "../../utils/api";
import renderStatus from "../../utils/renderStatus";

import "./Condos.css";

import ButtonPrimary from "../../components/ButtonPrimary";
import ModuleTitleClip from "../../components/ModuleTitleClip";
import Table from "../../components/Table";
import TableItem from "../../components/TableItem";
import TableItemEmpty from "../../components/TableItemEmpty";
import TableFooter from "../../components/TableFooter";
import TableHeader from "../../components/TableHeader";
import { Link, useNavigate } from "react-router-dom";
import LinkWithIcon from "../../components/LinkWithIcon";

export default function Contos() {
  const { showLoading, hideLoading } = useLoading();

  //condos
  const [condos, setCondos] = useState([]);
  const [currentPageCondos, setCurrentPageCondos] = useState(1);
  const [totalItemsCondos, setTotalItemsCondos] = useState(0);
  const [perPageCondos, setPerPageCondos] = useState(0);
  const [nextPageUrlCondos, setNextPageUrlCondos] = useState(null);
  const [prevPageUrlCondos, setPrevPageUrlCondos] = useState(null);

  const navigate = useNavigate();

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
    loadPageCondos();
  }, []);

  return (
    <section>
      <div className="container-box-inner-condos-page">
        <ModuleTitleClip title={`Condomínios`} />
        <div className="container-horizontal-tolls">
          <ButtonPrimary
            onClick={() => navigate("/condominiois/nova-manutencao")}
          >
            Novo Condomínio
          </ButtonPrimary>
        </div>
        <Table>
          <TableHeader
            columns="5"
            col1="Tipo"
            col2="Condomínio"
            col3="Data agendada"
            col4="Data de conclusão"
            col5="Status"
          />

          {condos?.length > 0 ? (
            condos?.map((condo) => (
              <TableItem
                key={condo?.id}
                columns="5"
                col1={condo?.nome}
                col2={condo?.cnpj}
                col3={
                  condo?.endereco + " / " + condo?.cidade + " / " + condo?.uf
                }
                col4={
                  condo?.telefone + " " + condo?.email || "Sem telefone e sem email"
                }
                col5={renderStatus(condo?.status)}
                actions={true}
                action_view={true}
                action_edit={false}
                action_delete={false}
                onClickView={() => {
                  navigate(`/condominios/condominio/${condo?.id}`);
                }}
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
    </section>
  );
}
