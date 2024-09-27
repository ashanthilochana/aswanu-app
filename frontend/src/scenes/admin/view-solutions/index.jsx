import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from "axios";

const ViewSolutions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [solutionData, setSolutionData] = useState([]);

  useEffect(() => {
    const fetchSolutionData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/api/solutions/get");
        const solutions = response.data.map((solution, index) => ({
          ...solution,
          id: solution.id || index,  // Use the index if id is missing
        }));
        setSolutionData(solutions);
      } catch (error) {
        console.error("Error fetching solution data:", error);
      }
    };

    fetchSolutionData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "solutionId", headerName: "Solution ID", flex: 1 },
    { field: "solutionName", headerName: "Solution Name", flex: 1 },
    {
      field: "diseaseCategory",
      headerName: "Disease Category",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "applicationMethod",
      headerName: "Application Method",
      flex: 1,
    },
    {
      field: "dosage",
      headerName: "Dosage (ml/ha)",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "applicationFrequency",
      headerName: "Application Frequency",
      type: "number",
      flex: 1,
    },
    {
      field: "applicationInterval",
      headerName: "Application Interval (days)",
      type: "number",
      flex: 1,
    },
    {
      field: "costPerHectare",
      headerName: "Cost per Hectare (Rs)",
      type: "number",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton key={`edit-${params.id}`} aria-label="edit">
            <EditIcon />
          </IconButton>
          <IconButton key={`delete-${params.id}`} aria-label="delete">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ),
    }
  ];

  return (
    <Box m="20px">
      <Header title="SOLUTIONS" subtitle="List of Solutions for Disease Management" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={solutionData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ViewSolutions;
