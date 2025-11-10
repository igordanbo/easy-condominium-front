import { useEffect, useState } from "react";
import { useLoading } from "../../context/LoadingContext";

import api from "../../utils/api";

import "./Maintenances.css";

import { Box, Card, CardContent, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { ptBR } from "@mui/x-data-grid/locales";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";

import ButtonPrimary from "../../components/ButtonPrimary";
import LinkPrimary from "../../components/LinkPrimary";

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
      width: 130,
      renderCell: (params) => {
        const dataAgendada = params.row.data_agendada || "—";

        return dataAgendada;
      },
    },

    {
      field: "data_conclusao",
      headerName: "Conclusão",
      width: 130,
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
      width: 130,
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
          icon = <CheckCircleIcon sx={{ mr: 0.5, fill: "var(--success)" }} />;
        } else if (status === "agendado") {
          color = "warning";
          icon = <CalendarMonthIcon sx={{ mr: 0.5, fill: "var(--warning)" }} />;
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
    {
      field: "id",
      headerName: "Ações",
      width: 85,
      renderCell: (params) => {
        const id = params.value;
        return <LinkPrimary
          href={`/manutencao/${id}`}
        >
        <EditIcon/>
        </LinkPrimary>
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
        <div style={{ height: 630 }}>
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
