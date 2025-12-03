import "./View.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoading } from "../../../context/LoadingContext";
import api from "../../../utils/api";

import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import LinkPrimary from "../../../components/LinkPrimary";
import Modal from "../../../components/Modal";
import DatePicker from "../../../components/DatePicker";

export default function ViewMaintenance() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [maintenance, setMaintenance] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    const d = new Date();
    const todayBr = d.toLocaleDateString("pt-BR"); 
    setSelectedDate(date || todayBr);
  };

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        showLoading();
        const response = await api.get(`manutencaos/${id}`);
        setMaintenance(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    fetchData();
  }, [id]);

  const handleStatusComplete = async () => {
      try {
        showLoading();
        const response = await api.put(`manutencaos/${id}`,{
          status: "concluido",
          data_conclusao: selectedDate.format("YYYY-MM-DD"),
        });
        navigate(-1)
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
  }

  if (!maintenance) return null;

  return (
    <section className="easy-section-main-view-maintenance">
      {/* HEADER */}
      <div className="easy-box-title-inner-pages">
        <div className="easy-back-prev-page" onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </div>

        <div>
          <small className="easy-small-title">Manutenções | Visualização</small>
          <h1>
            Manutenção <span>#{maintenance.id}</span>
          </h1>
        </div>
      </div>

      {/* MAIN INFO */}
      <div className="easy-main-info-content-view-maintenance">
        {/* STATUS */}
        {maintenance.status === "agendado" && (
          <div className="easy-box-single-info-view-maintenance">
            <div className="easy-box-status">
              <div className="easy-agendado">Manutenção agendada</div>
            </div>
          </div>
        )}

        {maintenance.status === "concluido" && (
          <div className="easy-box-single-info-view-maintenance">
            <div className="easy-box-status">
              <div className="easy-concluida">Manutenção concluída</div>
            </div>
          </div>
        )}

        {/* TIPO */}
        {maintenance?.tipo?.nome && (
          <div className="easy-box-single-info-view-maintenance">
            <label>Tipo</label>
            <p>{maintenance.tipo.nome}</p>
          </div>
        )}

        {/* CONDOMÍNIO */}
        {maintenance?.condominio && (
          <div className="easy-box-single-info-view-maintenance">
            <label>Condomínio</label>
            <p>{maintenance.condominio.nome}</p>

            <div className="easy-options-condos-view-maintenance">
              <LinkPrimary
                href={`https://wa.me/${maintenance.condominio.telefone}`}
              >
                <WhatsAppIcon />
              </LinkPrimary>

              <LinkPrimary href={`mailto:${maintenance.condominio.email}`}>
                <AlternateEmailIcon />
              </LinkPrimary>

              <LinkPrimary href={`/condominio/${maintenance.condominio.id}`}>
                <RemoveRedEyeIcon />
              </LinkPrimary>
            </div>
          </div>
        )}

        {/* DATAS */}
        {maintenance.data_agendada && (
          <div className="easy-box-single-info-view-maintenance">
            <label>Data de agendamento</label>
            <p>{maintenance.data_agendada}</p>
          </div>
        )}

        {maintenance.data_conclusao && (
          <div className="easy-box-single-info-view-maintenance">
            <label>Data de conclusão</label>
            <p>{maintenance.data_conclusao}</p>
          </div>
        )}

        {/* AÇÕES */}
        {maintenance.status === "agendado" && (
          <div className="easy-box-options-view-maintenance">
            <LinkPrimary
              addClass="success"
              onClick={() => setShowScheduleModal(true)}
            >
              Concluir <CheckCircleOutlineIcon />
            </LinkPrimary>

            <LinkPrimary addClass="danger" onClick={() => alert("Adiar")}>
              Adiar <HighlightOffIcon />
            </LinkPrimary>

            <LinkPrimary addClass="outlined" onClick={() => navigate(-1)}>
              Voltar <ArrowBackIcon />
            </LinkPrimary>
          </div>
        )}

        {/* MODAL — SELECIONAR DATA */}
        {showScheduleModal && (
          <Modal
            titleModal="Concluir manutenção"
            contentModal={<DatePicker onDateChange={handleDateChange} />}
            confirmModal
            cancelModal
            typeModal="info"
            onClickConfirmModal={() => {
              if (!selectedDate) {
                alert("Por favor, selecione uma data.");
                return;
              }
              setShowConfirmModal(true);
              setShowScheduleModal(false);
            }}
            onClickCancelModal={() => setShowScheduleModal(false)}
          />
        )}

        {/* MODAL — CONFIRMAR DATA */}
        {showConfirmModal && (
          <Modal
            titleModal="Concluir manutenção"
            contentModal={
              <>
                <div>Confirma a data de conclusão da manutenção?</div>
                <div>
                  <p>
                    Data selecionada:{" "}
                    <strong>{selectedDate?.format("DD/MM/YYYY")}</strong>
                  </p>
                </div>
              </>
            }
            confirmModal
            cancelModal
            typeModal="info"
            onClickConfirmModal={() => {
              handleStatusComplete();
            }}
            onClickCancelModal={() => setShowConfirmModal(false)}
          />
        )}
      </div>
    </section>
  );
}
