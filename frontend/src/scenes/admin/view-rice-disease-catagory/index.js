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

const ViewRiceDiseaseCategories = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [riceDiseaseCategories, setRiceDiseaseCategories] = useState([]);

  useEffect(() => {
    const fetchRiceDiseaseCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5300/api/disease-category/get");
        const categories = response.data.map((category, index) => ({
          ...category,
          id: category.id || index,  // Use the index if id is missing
        }));
        setRiceDiseaseCategories(categories);
      } catch (error) {
        console.error("Error fetching rice disease categories:", error);
      }
    };

    fetchRiceDiseaseCategories();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "categoryName", headerName: "Category Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 1 },
    {
      field: "severityLevel",
      headerName: "Severity Level",
      flex: 1,
    },
    {
      field: "symptoms",
      headerName: "Symptoms",
      flex: 1,
    },
    {
      field: "preventionMethods",
      headerName: "Prevention Methods",
      flex: 1,
    },
    {
      field: "region",
      headerName: "Region",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton key={`edit-${params.id}`} aria-label="edit"
           component={Link}
           to={`/admin/update-rice-disease-category/${params.id}`} // Link to the update route with the id
          >
            <EditIcon />
          </IconButton>
          <IconButton key={`delete-${params.id}`} aria-label="delete">
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="RICE DISEASE CATEGORIES" subtitle="List of Rice Disease Categories" />
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
          rows={riceDiseaseCategories}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ViewRiceDiseaseCategories;
