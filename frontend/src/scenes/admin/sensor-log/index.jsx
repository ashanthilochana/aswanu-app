import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { mockDataContacts } from "../../../data/mockData";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import SensorDataController from "../../../controllers/data/sensor.data.controller";
import axios from "axios";

const SensorLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  // Get sensor log with axio (http://localhost:5300/api/sensor/logs)
  const [sensorLog, setSensorLog] = useState([]);

  useEffect(() => {
    const fetchSensorLog = async () => {
      try {
        const response = await axios.get("http://localhost:5300/api/sensor/logs");
        const logs = response.data.map((log, index) => ({
          ...log,
          id: log.id || index,  // Use the index if id is missing
        }));
        setSensorLog(logs);
        console.log("Sensor log fetched successfully", logs);
      } catch (error) {
        console.error("Error fetching sensor log", error);
      }
    };

    fetchSensorLog();
  }, []);
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Station ID" },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "time",
      headerName: "Time",
      flex: 1,
      // cellClassName: "name-column--cell",
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "humidity",
      headerName: "Humidity (%)",
      flex: 1,
      // type: "number",
      // headerAlign: "left",
      // align: "left",
    },
    {
      field: "temp",
      headerName: "Temperature (°C)",
      flex: 1,
    },
    {
      field: "ldr",
      headerName: "LDR",
      flex: 1,
    },
    {
      field: "ph",
      headerName: "Ph Value",
      flex: 1,
    },
    {
      field: "rain",
      headerName: "Rain",
      flex: 1,
    },
    {
      field: "security",
      headerName: "Security",
      flex: 1,
    },
    {
      field: "tankWaterLevel",
      headerName: "Tank Water (L/m^3)",
      flex: 1,
    },
    {
      field: "statu",
      headerName: "Status",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="CONTACTS"
        subtitle="List of Contacts for Future Reference"
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
          rows={sensorLog}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default SensorLog;
