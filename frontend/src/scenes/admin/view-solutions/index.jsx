import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from "axios";
import EditSolutionPopup from "../edit-solution-popup"; // Import the popup component

const ViewSolutions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [solutionData, setSolutionData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false); // State to control popup visibility
  const [selectedSolution, setSelectedSolution] = useState(null); // Store selected solution data for editing

  useEffect(() => {
    fetchSolutionData();
  }, []);

  const fetchSolutionData = async () => {
    try {
      const response = await axios.get("http://localhost:5300/api/solutions/get");
      const solutions = response.data.map((solution, index) => ({
        ...solution,
        id: solution.sID || index,  // Use solutionID for the key (use index as fallback)
      }));
      setSolutionData(solutions);
    } catch (error) {
      console.error("Error fetching solution data:", error);
    }
  };

  // Delete solution data using solutionID
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5300/api/solutions/delete/${id}`);
      const updatedSolutions = solutionData.filter((solution) => solution.sID !== id);
      setSolutionData(updatedSolutions);
    } catch (error) {
      console.error("Error deleting solution data:", error);
    }
  };

  // Open the edit popup with selected solution data
  const handleEdit = (solution) => {
    setSelectedSolution(solution);
    setOpenEdit(true);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "solutionName", headerName: "Solution Name" },
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
      headerName: "Cost per hectare (Rs)",
      type: "number",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton key={`edit-${params.id}`} aria-label="edit" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            key={`delete-${params.id}`}
            aria-label="delete"
            onClick={() => handleDelete(params.id)}
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box m="20px">
        <Header title="SOLUTIONS" subtitle="List of Solutions for Disease Prevention" />
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

      {/* Edit Solution Popup */}
      {openEdit && (
        <EditSolutionPopup
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          selectedSolution={selectedSolution}
          refreshData={fetchSolutionData} // Refresh data after editing
        />
      )}
    </>
  );
};

export default ViewSolutions;
