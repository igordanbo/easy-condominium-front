import "./style.css";
export default function TableItem({
  columns = 1,
  col1,
  col2,
  col3,
  col4,
  col5,
  actions,
  action_view,
  action_edit,
  action_delete,
  onClickView,
  onClickEdit,
  onClickDelete
}) {
  return (
    <div
      className="container-table-item"
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >

      {col1 ? <div className="inner-item-table-content">{col1}</div> : ""}
      {col2 ? <div className="inner-item-table-content">{col2}</div> : ""}
      {col3 ? <div className="inner-item-table-content">{col3}</div> : ""}
      {col4 ? <div className="inner-item-table-content">{col4}</div> : ""}
      {col5 ? <div className="inner-item-table-content">{col5}</div> : ""}
      {actions ? (
        <div className="actions-table-content">
          {action_view ? (
            <button onClick={onClickView} className="action-table-item-button action-view-table-item-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
              </svg>
            </button>
          ) : (
            ""
          )}
          {action_edit ? (
            <button className="action-table-ite-button action-edit-table-item-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </button>
          ) : (
            ""
          )}
          {action_delete ? (
            <button className="action-table-item-button action-delete-table-item-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#fff"
              >
                <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
              </svg>
            </button>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
