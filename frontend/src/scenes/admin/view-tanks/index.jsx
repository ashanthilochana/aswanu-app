import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme, IconButton } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import axios from "axios";

const ViewTanks = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [tankData, setTankData] = useState([]);

  useEffect(() => {
    const fetchTankData = async () => {
      try {
        const response = await axios.get("http://localhost:5300/api/tank/get");
        const tanks = response.data.map((tank, index) => ({
          ...tank,
          id: tank.id || index,  // Use the index if id is missing
        }));
        setTankData(tanks);
      } catch (error) {
        console.error("Error fetching tank data:", error);
      }
    };

    fetchTankData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "tankName", headerName: "Tank Name" },
    {
      field: "district",
      headerName: "District/Province",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "tankCapacity",
      headerName: "Tank Capacity",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "waterSource",
      headerName: "Water Source Type",
      flex: 1,
    },
    {
      field: "tankStatus",
      headerName: "Tank Status",
      flex: 1,
    },
    {
      field: "installationDate",
      headerName: "Installation Date",
      flex: 1,
    },
    {
      field: "irigatedArea",
      headerName: "Irigated Area",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton key={`location-${params.id}`} aria-label="location">
            <LocationOnOutlinedIcon />
          </IconButton>
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
      <Header
        title="TANKS"
        subtitle="List of Tanks for Future Reference"
      />
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
          rows={tankData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default ViewTanks;
