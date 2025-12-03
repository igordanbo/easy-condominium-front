import { useEffect, useState } from "react";
import Form from "../../../components/Form";
import ModuleTitleClip from "../../../components/ModuleTitleClip";
import Select from "../../../components/Select";
import DatePicker from "../../../components/DatePicker";
import { useLoading } from "../../../context/LoadingContext";
import api from "../../../utils/api";
import "./AddMaintenance.css";
import Button from "@mui/material/Button";
import ButtonPrimary from "../../../components/ButtonPrimary";
import Modal from "../../../components/Modal";

export default function AddMaintenance() {
  const { showLoading, hideLoading } = useLoading();

  const [maintenancesTypes, setMaintenancesTypes] = useState([]);
  const [condos, setCondos] = useState([]);
  const [showModalDatePicker, setShowModalDatePicker] = useState(false);

  const loadMaintenancesTypes = async () => {
    try {
      showLoading();

      const response = await api.get("/tipos-manutencao?per_page=1000");
      const res = response.data;

      setMaintenancesTypes(res.data);
    } catch (error) {
      console.error("Erro ao buscar tipos de manutenções:", error);
    } finally {
      hideLoading();
    }
  };

  const loadCondos = async () => {
    try {
      showLoading();

      const response = await api.get("/condominios?per_page=1000");
      const res = response.data;

      setCondos(res.data);
    } catch (error) {
      console.error("Erro ao buscar tipos de manutenções:", error);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    loadMaintenancesTypes();
    loadCondos();
  }, []);

  return (
    <section className="container-box-inner-add-maintenance-page">
      <ModuleTitleClip title={`Adicionar Nova Manutenção`} />
      <p className="adicional-info">
        Insira os dados para lançar uma nova manutenção em um ou mais
        condomínios.
      </p>
      <div className="easy-box-form-add-maintenance">
        <Form onSubmit={() => {}}>
          <Select
            label="Selecione o Tipo da Manutenção"
            options={maintenancesTypes?.map((item) => ({
              label: item?.nome,
              value: item?.id,
            }))}
          />
          <div className="easy-box-selection-group">
            <Select
              label="Selecione o Condomínio"
              options={condos?.map((item) => ({
                label: item?.nome,
                value: item?.id,
              }))}
            />
            <div>
              {" "}
              <button
                onClick={(event) => {
                  event.preventDefault();
                  setShowModalDatePicker(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#fff"
                >
                  <path d="M680-80v-120H560v-80h120v-120h80v120h120v80H760v120h-80Zm-480-80q-33 0-56.5-23.5T120-240v-480q0-33 23.5-56.5T200-800h40v-80h80v80h240v-80h80v80h40q33 0 56.5 23.5T760-720v244q-20-3-40-3t-40 3v-84H200v320h280q0 20 3 40t11 40H200Zm0-480h480v-80H200v80Zm0 0v-80 80Z" />
                </svg>
              </button>
              {}
            </div>
          </div>
        </Form>
      </div>
      {showModalDatePicker && (
        <>
          <Modal
            typeModal="info"
            titleModal="Selecionar Data Agendada"
            confirmModal={true}
            cancelModal={true}
            contentModal={<DatePicker onChangeDate={() => {}} />}
            onClickCancelModal={() => setShowModalDatePicker(false)}
          />
        </>
      )}
    </section>
  );
}
