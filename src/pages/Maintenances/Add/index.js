import { useEffect, useState } from "react";
import Form from "../../../components/Form";
import ModuleTitleClip from "../../../components/ModuleTitleClip";
import Select from "../../../components/Select";
import DatePicker from "../../../components/DatePicker";
import { useLoading } from "../../../context/LoadingContext";
import api from "../../../utils/api";
import "./AddMaintenance.css";
import ButtonPrimary from "../../../components/ButtonPrimary";
import Modal from "../../../components/Modal";

export default function AddMaintenance() {
  const { showLoading, hideLoading } = useLoading();

  const [maintenancesTypes, setMaintenancesTypes] = useState([]);
  const [condos, setCondos] = useState([]);

  // Blocos e apartamentos por ínidice
  const [blocksByIndex, setBlocksByIndex] = useState({});
  const [aptosByIndex, setAptosByIndex] = useState({});

  // Lista dinâmica
  const [maintenanceList, setMaintenanceList] = useState([
    { condo: "", block: "", ap: "", date: "" },
  ]);

  // Modal de data
  const [showModalDatePicker, setShowModalDatePicker] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const [selectedMaintenanceType, setSelectedMaintenanceType] = useState("");

  const loadMaintenancesTypes = async () => {
    try {
      showLoading();
      const response = await api.get("/tipos-manutencao?per_page=1000");
      setMaintenancesTypes(response.data.data);
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
      setCondos(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar condomínios:", error);
    } finally {
      hideLoading();
    }
  };

  const loadBlocks = async (condo_id, index) => {
    try {
      const response = await api.get(`/blocos?condominio_id=${condo_id}`);
      setBlocksByIndex((prev) => ({
        ...prev,
        [index]: response.data,
      }));

      // limpa aptos
      setAptosByIndex((prev) => ({
        ...prev,
        [index]: [],
      }));
    } catch (error) {
      console.error("Erro ao buscar blocos:", error);
    }
  };

  const loadAptos = async (block_id, index) => {
    try {
      const response = await api.get(`/apartamentos?bloco_id=${block_id}`);
      setAptosByIndex((prev) => ({
        ...prev,
        [index]: response.data,
      }));
    } catch (error) {
      console.error("Erro ao buscar apartamentos:", error);
    }
  };

  useEffect(() => {
    loadMaintenancesTypes();
    loadCondos();
  }, []);

  const updateMaintenance = (index, field, value) => {
    const updated = [...maintenanceList];
    updated[index][field] = value;
    setMaintenanceList(updated);
  };

  const addMaintenance = () => {
    setMaintenanceList([
      ...maintenanceList,
      { condo: "", block: "", ap: "", date: "" },
    ]);
  };

  const removeMaintenance = (index) => {
    const updated = maintenanceList.filter((_, i) => i !== index);
    setMaintenanceList(updated);
  };

  // Função para converter "2025-12-11T15:05:20.824Z" → "2025-12-11 15:05:20"
  const formatToMySQLDate = (dateString) => {
    if (!dateString) return null;

    return new Date(dateString).toISOString().slice(0, 19).replace("T", " ");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!selectedMaintenanceType) {
      alert("Selecione um tipo de manutenção.");
      return;
    }

    for (const item of maintenanceList) {
      if (!item.condo) {
        alert("Todos os itens precisam ter um condomínio selecionado.");
        return;
      }
    }

    for (const item of maintenanceList) {
      if (!item.date) {
        alert(
          "Todos os itens precisam ter uma data de agendamento selecionada."
        );
        return;
      }
    }

    try {
      showLoading();

      for (const item of maintenanceList) {
        const mysqlDate = formatToMySQLDate(item.date);

        await api.post("/manutencaos", {
          tipo_manutencao_id: selectedMaintenanceType,
          condominio_id: item.condo,
          status: "agendado",
          bloco: item.block || null,
          apartamento: item.ap || null,
          data_agendada: mysqlDate, // <-- já formatada aqui
        });
      }

      alert("Manutenções cadastradas com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar manutenção:", error);
    } finally {
      hideLoading();
    }
  };

  return (
    <section className="container-box-inner-add-maintenance-page">
      <ModuleTitleClip title={`Adicionar Nova Manutenção`} />
      <p className="adicional-info">
        Insira os dados para lançar uma nova manutenção em um ou mais
        condomínios.
      </p>

      <div className="easy-box-form-add-maintenance">
        <Form onSubmit={handleSubmit}>
          {/* Tipo de manutenção */}
          <Select
            label="Selecione o Tipo da Manutenção"
            options={maintenancesTypes.map((item) => ({
              label: item.nome,
              value: item.id,
            }))}
            value={selectedMaintenanceType}
            onChange={(e) => setSelectedMaintenanceType(e.target.value)}
          />

          {/* Lista dinâmica */}
          {maintenanceList.map((item, index) => (
            <div key={index} className="maintenance-item-condo-container">
              <label class="maintenance-number-label">
                Manutenção 0{index + 1}
              </label>
              {/* SELECT: CONDOMÍNIO */}
              <Select
                label="Condomínio"
                value={item.condo}
                onChange={(e) => {
                  const condoId = e.target.value;

                  updateMaintenance(index, "condo", condoId);
                  updateMaintenance(index, "block", "");
                  updateMaintenance(index, "ap", "");

                  loadBlocks(condoId, index);
                }}
                options={condos.map((c) => ({
                  label: c.nome,
                  value: c.id,
                }))}
              />

              {/* SELECT: BLOCO */}
              {item.condo && (
                <Select
                  label="Bloco"
                  defaultOptionText="Todos"
                  value={item.block}
                  onChange={(e) => {
                    const blockId = e.target.value;
                    updateMaintenance(index, "block", blockId);
                    updateMaintenance(index, "ap", ""); // limpa apto ao trocar bloco
                    loadAptos(blockId, index);
                  }}
                  options={
                    blocksByIndex[index] && blocksByIndex[index].length > 0
                      ? blocksByIndex[index].map((b) => ({
                          label: b.nome,
                          value: b.id,
                        }))
                      : [{ label: "Nenhum bloco encontrado", value: "" }]
                  }
                  disabled={
                    !(blocksByIndex[index] && blocksByIndex[index].length > 0)
                  }
                />
              )}

              {/* SELECT: APARTAMENTO — aparece quando bloco selecionado */}
              {item.block && (
                <Select
                  label="Apartamento"
                  defaultOptionText="Todos"
                  value={item.ap}
                  onChange={(e) =>
                    updateMaintenance(index, "ap", e.target.value)
                  }
                  options={
                    aptosByIndex[index] && aptosByIndex[index].length > 0
                      ? aptosByIndex[index].map((a) => ({
                          label: a.numero || a.nome || `Apto ${a.id}`,
                          value: a.id,
                        }))
                      : [
                          {
                            label: "Nenhum apartamento encontrado",
                            value: "",
                          },
                        ]
                  }
                  disabled={
                    !(aptosByIndex[index] && aptosByIndex[index].length > 0)
                  }
                />
              )}

              {/* Botão para abrir modal de data */}
              <div className="box-select-date-infos-inner-condo">
                <ButtonPrimary
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(index);
                    setShowModalDatePicker(true);
                  }}
                >
                  Selecionar data
                </ButtonPrimary>
              </div>

              <p className="selected-date">
                {item.date
                  ? `Data selecionada: ${item.date}`
                  : "Nenhuma data selecionada"}
              </p>

              {/* Remove */}
              {maintenanceList.length > 1 && (
                <button
                  className="remove-btn-inner-condos-box"
                  onClick={(e) => {
                    e.preventDefault();
                    removeMaintenance(index);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="var(--danger)"
                  >
                    <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                  </svg>
                </button>
              )}
            </div>
          ))}

          {/* Botão adicionar */}
          <button
            className="add-condo-btn-box-add-maintenance"
            onClick={(e) => {
              e.preventDefault();
              addMaintenance();
            }}
          >
            Adicionar condomínio
          </button>

          <ButtonPrimary
            type="submit"
            onClick={() => {
              handleSubmit();
            }}
          >
            Salvar manutenção
          </ButtonPrimary>
        </Form>
      </div>

      {/* Modal de escolha da data */}
      {showModalDatePicker && (
        <Modal
          typeModal="info"
          titleModal="Selecionar data da manutenção"
          confirmModal={false}
          cancelModal={false}
          contentModal={
            <DatePicker
              onDateChange={(date) => {
                updateMaintenance(activeIndex, "date", date);
                setShowModalDatePicker(false);
              }}
            />
          }
        />
      )}
    </section>
  );
}
