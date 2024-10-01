import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from "axios";
import { Link } from "react-router-dom";

const ViewRiceVariations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [riceVariations, setRiceVariations] = useState([]);

  useEffect(() => {
    const fetchRiceVariations = async () => {
      try {
        const response = await axios.get("http://localhost:5300/api/variation/get");
        const variations = response.data.map((variation, index) => ({
          ...variation,
          id: variation.id || index, // Use the index if id is missing
        }));
        setRiceVariations(variations);
      } catch (error) {
        console.error("Error fetching rice variations:", error);
      }
    };

    fetchRiceVariations();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "variantName", headerName: "Rice Variant Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "growingSeason",
      headerName: "Growing Season",
      flex: 1,
    },
    {
      field: "diseaseResistance",
      headerName: "Disease Resistance",
      flex: 1,
    },
    {
      field: "environmentalSuitability",
      headerName: "Environmental Suitability",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            key={`edit-${params.id}`} // Fix key string interpolation
            aria-label="edit"
            component={Link} // Use Link as a component for the button
            to={`/admin/update-rice-variations/${params.id}`} // Link to the update route with the id
          >
            <EditIcon />
          </IconButton>
          <IconButton
            key={`delete-${params.id}`} // Fix key string interpolation
            aria-label="delete"
            // Add delete functionality here if needed
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="RICE VARIATIONS" subtitle="List of Rice Variations" />
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
            color: `${colors.greenAccent[200]} !important`, // Fix string interpolation
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`, // Fix string interpolation
          },
        }}
      >
        <DataGrid
          rows={riceVariations}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ViewRiceVariations;
