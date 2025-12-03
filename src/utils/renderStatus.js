import "./utilsStyles.css";

export default function renderStatus(status) {
  if (status === "agendado")
    return (
      <span className="badge-render-status badge-render-status-agendada">
        Agendada
      </span>
    );
  if (status === "concluido")
    return (
      <span className="badge-render-status badge-render-status-concluida">
        Concluída
      </span>
    );
  if (status === "cancelado")
    return (
      <span className="badge-render-status badge-render-status-cancelada">
        Cancelada
      </span>
    );
  if (status === "ativo")
    return (
      <span className="badge-render-status badge-render-status-concluida">
        Ativo
      </span>
    );

  if (status === "inativo")
    return (
      <span className="badge-render-status badge-render-status-cancelada">
        Inativo
      </span>
    );

  return <span>Indefinido</span>;
}
