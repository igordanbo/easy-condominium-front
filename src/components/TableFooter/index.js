import "./style.css";
import ButtonSecundary from "../ButtonSecundary";

export default function TableFooter({
  prev,
  next,
  perPage,
  totalItems,
  currentPage,
  onClickPrev,
  onClickNext,
}) {
  return (
    <div className="container-table-footer">
      <ButtonSecundary
        addClass={!prev ? "easy-button-secundary-disable" : ""}
        disabled={!prev}
        onClick={prev ? onClickPrev : undefined}
      >
        Página anterior
      </ButtonSecundary>

      {totalItems && currentPage && perPage ? <span>Página <span className="badge-info-footer">{currentPage}</span> | Exibindo <span className="badge-info-footer">{perPage}</span> itens | Total de itens: <span className="badge-info-footer">{totalItems}</span></span> : ""}

      <ButtonSecundary
        addClass={!next ? "easy-button-secundary-disable" : ""}
        disabled={!next}
        onClick={next ? onClickNext : undefined}
      >
        Próxima página
      </ButtonSecundary>
    </div>
  );
}
