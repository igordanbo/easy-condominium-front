import "./Modal.css";

import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

export default function Modal({
  typeModal,
  titleModal,
  contentModal,
  confirmModal,
  cancelModal,
  onClickConfirmModal,
  onClickCancelModal,
}) {
  return (
    <div className="easy-modal-container">
      <div className={`easy-modal-content easy-modal-content-${typeModal}`}>
        <div className={`easy-modal-color`}></div>

        <div className={`easy-modal-title`}>
          <div className={`easy-modal-icon`}>
            <div className="bg"></div>
            <InfoOutlineIcon />
          </div>
          <p>{titleModal}</p>
        </div>

        <div className={`easy-modal-info-content`}>
          <p>{contentModal}</p>
        </div>

        <div className={`easy-modal-actions`}>
          {confirmModal ? (
            <button
              className={`easy-modal-action-confirm`}
              onClick={onClickConfirmModal}
            >
              Confirmar
            </button>
          ) : (
            ""
          )}

          {cancelModal ? (
            <button
              className={`easy-modal-action-cancel`}
              onClick={onClickCancelModal}
            >
              Cancelar
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
