import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";
import api from "../../utils/api";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";

import ButtonPrimary from "../../components/ButtonPrimary";

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
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import './Maintenances.css'

export default function Maintenances() {
  const { showLoading, hideLoading } = useLoading();

  const [maintenances, setMaintenances] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        showLoading();
        const response = await api.get("/manutencaos");

        const data = response.data.data;
        setMaintenances(data);
      } catch (error) {
        console.error("Erro ao buscar manutenções:", error);
      } finally {
        hideLoading();
      }
    };

    fetchData();
  }, []);

  /*
   useEffect(() => {
    console.log(maintenances)
   }, [maintenances])
   */

  /* Colunas das manutenções */
  const maintColumns = [
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
      field: "condominio",
      headerName: "Condomínio",
      flex: 1,
      renderCell: (params) => {
        const dataAgendada = params.row.condominio.nome || "—";

        return dataAgendada;
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

  return (
    <section>
      <div className="easy-header-lists-page">
        <div className="easy-title-lists">
          <h1>Manutenções programadas</h1>
          <p>
            Gerencie as manutenções programadas de todos os seus condomínios.
          </p>
        </div>
        <div className="easy-nav-options-lists">
          <ButtonPrimary>Nova</ButtonPrimary>
        </div>
      </div>

      <Box sx={{ borderRadius: 4, background: "#fff", p: 2 }}>
        <div style={{ height: 600 }}>
          <DataGrid
            rows={maintenances}
            columns={maintColumns}
            getRowId={(row) => row.id || row._id}
            pageSize={25}
            rowsPerPageOptions={[5]}
            localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            sx={{
              border: 0,
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#fff",
              },
            }}
          />
        </div>
      </Box>
    </section>
  );
}
