import { useEffect, useState } from "react";
import { Box, Card, CardContent, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import GridOnIcon from "@mui/icons-material/GridOn";

import api from "../../utils/api";
import { useLoading } from "../../context/LoadingContext";
import "./GridChartsIntegrationRowGrouping.css";

export default function GridChartsIntegrationRowGrouping() {
  const { showLoading, hideLoading } = useLoading();
  const [condos, setCondos] = useState([]);
  const [manutencoes, setManutencoes] = useState([]);
  const [error, setError] = useState(null);

  /* Carrega dados dos condomínios e manutenções */
  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();

        const [condoRes, manutRes] = await Promise.all([
          api.get("/condominios"),
          api.get("/manutencaos"),
        ]);

        setCondos(condoRes?.data?.data || []);
        setManutencoes(manutRes?.data?.data || []);
      } catch (err) {
        setError(err.message || "Erro ao buscar dados");
        setCondos([]);
        setManutencoes([]);
      } finally {
        hideLoading();
      }
    };
    fetchData();
  }, []);

  /* Colunas dos condomínios */
  const condoColumns = [
    { field: "nome", headerName: "Nome do Condomínio", flex: 1 },
    { field: "cidade", headerName: "Cidade", flex: 1 },
    { field: "cnpj", headerName: "CNPJ", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        const status = params.value?.toLowerCase();
        let color = "default";
        let icon = null;
        let label = params.value;

        if (status === "ativo") {
          color = "success";
          icon = <CheckCircleIcon sx={{ mr: 0.5, fill: "#006400" }} />;
          label = "Ativo";
        } else if (status === "inativo") {
          color = "error";
          icon = <ErrorIcon sx={{ mr: 0.5, fill: "#660000" }} />;
          label = "Inativo";
        } else {
          color = "info";
          icon = <InfoIcon sx={{ mr: 0.5 }} />;
        }

        return (
          <Chip
            label={label}
            color={color}
            icon={icon}
            variant="outlined"
            sx={{ fontWeight: "bold", borderRadius: "8px" }}
          />
        );
      },
    },
  ];

  {
    console.log(manutencoes);
  }
  /* Colunas das manutenções */
  const manutColumns = [
    {
      field: "tipo",
      headerName: "Tipo",
      flex: 1,
      renderCell: (params) => {
        const tipoNome = params.row.tipo?.nome || "—";

        return tipoNome;
      },
    },

    {
      field: "data_agendada",
      headerName: "Data agendada",
      flex: 1,
      renderCell: (params) => {
        const dataAgendada = params.row.data_agendada || "—";

        return dataAgendada;
      },
    },

    {
      field: "data_conclusao",
      headerName: "Conclusão",
      flex: 1,
      renderCell: (params) => {
        const dataConclusao = params.row.data_conclusao || "—";

        return dataConclusao;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        const status = params.value?.toLowerCase();
        let color = "default";
        let icon = null;
        let label = params.value;

        if (status === "em andamento") {
          color = "info";
          icon = <InfoIcon sx={{ mr: 0.5 }} />;
        } else if (status === "concluída" || status === "concluido") {
          color = "success";
          icon = <CheckCircleIcon sx={{ mr: 0.5, fill: "#006400" }} />;
        } else if (status === "agendado") {
          color = "warning";
          icon = <CalendarMonthIcon sx={{ mr: 0.5, fill: "#ff7420" }} />;
        }

        return (
          <Chip
            label={label}
            color={color}
            icon={icon}
            variant="outlined"
            sx={{ textTransform: "capitalize", borderRadius: "12px" }}
          />
        );
      },
    },
  ];

  const chartData = [
    {
      status: "Ativos",
      quantidade: condos.filter((c) => c.status === "ativo").length,
    },
    {
      status: "Inativos",
      quantidade: condos.filter((c) => c.status === "inativo").length,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "100%",
      }}
    >
      {/* === GRID 1: MANUTENÇÕES === */}
      <div className="dashboard-titulo-listagens">
        <ManageHistoryIcon />
        <div className="dot"></div>
        <span>Manutenções</span>
        <div className="color-area"></div>
      </div>
      <Box sx={{ borderRadius: 4, background: "#fff", p: 2 }}>
        <div style={{ height: 400 }}>
          <DataGrid
            rows={manutencoes}
            columns={manutColumns}
            getRowId={(row) => row.id || row._id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#dbfbe2",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </Box>

      {/* === GRID 2: CONDOMÍNIOS === */}
      <div className="dashboard-titulo-listagens">
        <GridOnIcon />
        <div className="dot"></div>
        <span>Condomínios</span>
        <div className="color-area"></div>
      </div>
      <Box sx={{ borderRadius: 4, background: "#fff", p: 2 }}>
        <div style={{ height: 400 }}>
          <DataGrid
            rows={condos}
            columns={condoColumns}
            getRowId={(row) => row.id || row._id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#dbfbe2",
                fontWeight: "bold",
              },
            }}
          />
        </div>
      </Box>

      {/* === CHART === */}
      <Box sx={{ borderRadius: 4, background: "#fff", p: 2 }}>
        <Card sx={{ boxShadow: 0 }}>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="quantidade"
                  stroke="var(--accent-color)"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
