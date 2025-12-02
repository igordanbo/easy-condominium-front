import './utilsStyles.css'

export default function renderStatus(status) {
  if (status === "agendado") return <span className="badge-render-status badge-render-status-agendada">Agendada</span>;
  if (status === "concluido") return <span className="badge-render-status badge-render-status-concluida">Concluída</span>;
  if (status === "cancelado") return <span className="badge-render-status badge-render-status-cancelada">Cancelada</span>;

  return <span>Indefinido</span>;
}
