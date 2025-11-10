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
  const params = useParams();
  const navigate = useNavigate();
  const idParam = params.id;

  const { showLoading, hideLoading } = useLoading();
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [maintenance, setMaintenance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();
        const response = await api.get(`manutencaos/${idParam}`);
        const data = response.data;

        setMaintenance(data);
      } catch (err) {
        console.error(err);
      } finally {
        hideLoading();
      }
    };

    fetchData();
  }, [idParam]);

  if (!idParam) {
    return;
  }

  return (
    <section className="easy-section-main-view-maintenance">
      <div className="easy-box-title-inner-pages">
        <div
          className="easy-back-prev-page"
          onClick={() => {
            navigate(-1);
          }}
        >
          <ArrowBackIcon />
        </div>
        <div>
          <small className="easy-small-title">Maintenções | Visualização</small>
          <h1>
            Manutenção<span>#{maintenance?.id}</span>
          </h1>
        </div>
      </div>
      <div className="easy-main-info-content-view-maintenance">
        {maintenance?.status ? (
          <div className="easy-box-single-info-view-maintenance">
            {maintenance?.status === "agendado" ? (
              <div className="easy-box-status">
                <div className="easy-agendado">Manutenção agendada</div>
              </div>
            ) : (
              ""
            )}

            {maintenance?.status === "concluido" ? (
              <div className="easy-box-status">
                <div className="easy-concluida">Manutenção concluída</div>
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}

        {maintenance?.tipo?.nome ? (
          <div className="easy-box-single-info-view-maintenance">
            <label>Tipo</label>
            <p>{maintenance?.tipo?.nome}</p>
          </div>
        ) : (
          ""
        )}

        {maintenance?.condominio?.nome ? (
          <div className="easy-box-single-info-view-maintenance">
            <label>Condomínio</label>
            <p>{maintenance?.condominio?.nome}</p>
            <div className="easy-options-condos-view-maintenance">
              <LinkPrimary
                href={`https://wa.me/${maintenance?.condominio?.telefone}`}
              >
                <WhatsAppIcon />
              </LinkPrimary>

              <LinkPrimary href={`mailto:${maintenance?.condominio?.email}`}>
                <AlternateEmailIcon />
              </LinkPrimary>

              <LinkPrimary href={`/condominio/${maintenance?.condominio?.id}`}>
                <RemoveRedEyeIcon />
              </LinkPrimary>
            </div>
          </div>
        ) : (
          ""
        )}

        {maintenance?.data_agendada ? (
          <div className="easy-box-single-info-view-maintenance">
            <label>Data de agendamento</label>
            <p>{maintenance?.data_agendada}</p>
          </div>
        ) : (
          ""
        )}

        {maintenance?.data_conclusao ? (
          <div className="easy-box-single-info-view-maintenance">
            <label>Data de conclusão</label>
            <p>{maintenance?.data_conclusao}</p>
          </div>
        ) : (
          ""
        )}

        <div className="easy-box-options-view-maintenance">
          {maintenance?.status === "agendado" ? (
            <>
              <LinkPrimary
                addClass="success"
                onClick={() => {
                  setShowScheduleModal(true);
                }}
              >
                Concluir
                <CheckCircleOutlineIcon />
              </LinkPrimary>

              <LinkPrimary
                addClass="danger"
                onClick={() => {
                  alert("Adiar");
                }}
              >
                Adiar <HighlightOffIcon />
              </LinkPrimary>

              <LinkPrimary
                addClass="outlined"
                onClick={() => {
                  navigate(-1);
                }}
              >
                Voltar <ArrowBackIcon />
              </LinkPrimary>
            </>
          ) : (
            ""
          )}
        </div>

        {showScheduleModal ? (
          <Modal
            titleModal={"Concluir manutenção"}
            contentModal={
              <>
                <DatePicker onDateChange={handleDateChange} />
              </>
            }
            confirmModal={true}
            cancelModal={true}
            typeModal={"info"}
            onClickConfirmModal={() => {
              alert(`Data de conclusão ${selectedDate}`);
            }}
            onClickCancelModal={() => {
              setShowScheduleModal(false);
            }}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
}
