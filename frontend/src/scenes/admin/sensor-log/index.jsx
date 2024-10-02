import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import { useState, useEffect } from "react";

import SensorDataController from "../../../controllers/data/sensor.data.controller";
import axios from "axios";

const SensorLog = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [sensorData, setSensorData] = useState([]);

  const fetchSensorData = async () => {
    try {
      const response = await axios.get('http://localhost:5300/api/sensor/logs');
      const data = response.data;
      const formattedData = data.map((item, index) => ({
        id: item.id || index, // Unique ID for each row
        rain: item.data?.Sensors?.Malabe?.rain ?? 'N/A',
        security: item.data?.Sensors?.Malabe?.security ?? 'N/A',
        temp: item.data?.Sensors?.Malabe?.temp ?? 'N/A',
        soilMoisture: item.data?.Sensors?.Malabe?.soilMoisture ?? 'N/A',
        ph: item.data?.Sensors?.Malabe?.ph ?? 'N/A',
        humidity: item.data?.Sensors?.Malabe?.humidity ?? 'N/A',
        ldr: item.data?.Sensors?.Malabe?.ldr ?? 'N/A',
        waterPump: item.data?.Sensors?.Malabe?.Devices?.waterPump ?? 'N/A',
        fertilizerSpray: item.data?.Sensors?.Malabe?.Devices?.fertilizerSpray ?? 'N/A',
        tankWaterLevel: item.data?.Sensors?.Malabe?.tankWaterLevel ?? 'N/A',
      }));
      setSensorData(formattedData);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    fetchSensorData();

  }, []);
  
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "rain", headerName: "Rain", type: "number", flex: 1 },
    { field: "security", headerName: "Security", type: "boolean", flex: 1 },
    { field: "temp", headerName: "Temperature", type: "number", flex: 1 },
    { field: "soilMoisture", headerName: "Soil Moisture", type: "number", flex: 1 },
    { field: "ph", headerName: "pH", type: "number", flex: 1 },
    { field: "humidity", headerName: "Humidity", type: "number", flex: 1 },
    { field: "ldr", headerName: "Light (LDR)", type: "number", flex: 1 },
    { field: "waterPump", headerName: "Water Pump", type: "boolean", flex: 1 },
    { field: "fertilizerSpray", headerName: "Fertilizer Spray", type: "boolean", flex: 1 },
    { field: "tankWaterLevel", headerName: "Tank Water Level", type: "number", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="SENSOR LOG"
        subtitle="List of Sensor Data from Malabe"
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
          rows={sensorData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default SensorLog;
