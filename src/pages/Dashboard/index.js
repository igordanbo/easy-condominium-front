import GridDashboard from "../../components/GridDashboard";
import { useLoading } from "../../context/LoadingContext";
import api from "../../utils/api";

export default function Dashboard() {
  const { showLoading, hideLoading } = useLoading();

  return <GridDashboard />;
}
