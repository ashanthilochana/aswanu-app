import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../data/mockData";

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import GrainIcon from "@mui/icons-material/Grain";
import GppGoodIcon from "@mui/icons-material/GppGood";
import HeatPumpIcon from "@mui/icons-material/HeatPump";
import SanitizerIcon from "@mui/icons-material/Sanitizer";
import WavesIcon from "@mui/icons-material/Waves";
import ThermostatIcon from "@mui/icons-material/Thermostat";

import Header from "../../../components/Header";
import LineChart from "../../../components/LineChart";
import GeographyChart from "../../../components/GeographyChart";
import BarChart from "../../../components/BarChart";
import StatBox from "../../../components/StatBox";
import ProgressCircle from "../../../components/ProgressCircle";
import { socket } from "../../../socket";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [realTimeData, setRealTimeData] = useState({
    temp: "0",
    waterPumpOn: false,
    fertilizerPumpOn: false,
  });

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onRefreshData(data) {
      setRealTimeData((prev) => {
        return {
          ...prev,
          temp: data.Sensors.Malabe.temp, //find another way
          waterPumpOn: data.Sensors.Malabe.Devices.waterPump,
          fertilizerPumpOn: data.Sensors.Malabe.Devices.fertilizerSpray,
        };
      });
    }

    socket.on("connection", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("data-refresh", onRefreshData);

    return () => {
      socket.off("connection", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("data-refresh", onRefreshData);
    };
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="SENSOR DATA" subtitle="All Live Sensor Data Appeared Here" />

        {/* Created by us */}
        <Box display="flex">
          <Box width={150} marginRight={1}>
            <FormControl fullWidth>
              <InputLabel id="location-selectr">District</InputLabel>
              <Select
                labelId="location-select"
                id="location-select"
                value={10}
                label="Location"
                // onChange={}
              >
                <MenuItem value={10}>Colombo</MenuItem>
                <MenuItem value={20}>Polonnaruwa</MenuItem>
                <MenuItem value={30}>Anuradhapura</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box width={150} marginRight={1}>
            <FormControl fullWidth>
              <InputLabel id="location-selectr">Location</InputLabel>
              <Select
                labelId="location-select"
                id="location-select"
                value={10}
                label="Location"
                // onChange={}
              >
                <MenuItem value={10}>Malabe</MenuItem>
                <MenuItem value={20}>Polonnaruwa</MenuItem>
                <MenuItem value={30}>Anuradhapura</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "14px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 Stat*/}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={`${realTimeData.temp}` + " °C"}
            subtitle="Temparature"
            progress="0.2"
            increase="+20%"
            icon={
              <ThermostatIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Normal"
            subtitle="Soil Moisture"
            progress="0.50"
            increase="+21%"
            icon={
              <WaterDropIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Raining"
            subtitle="Weather"
            progress="0.30"
            increase="+5%"
            icon={
              <ThunderstormIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Normal"
            subtitle="Air Humidity"
            progress="0.80"
            increase="+43%"
            icon={
              <GrainIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 Stat */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="No Alerts"
            subtitle="Security Status"
            progress="NULL"
            increase=""
            icon={
              <GppGoodIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={realTimeData.waterPumpOn ? "ON" : "OFF"}
            subtitle="Water Pump Status"
            progress="NULL"
            increase=""
            icon={
              <HeatPumpIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={realTimeData.fertilizerPumpOn ? "ON" : "OFF"}
            subtitle="Fertilizer Pump Status"
            progress="NULL"
            increase=""
            icon={
              <SanitizerIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="Medium"
            subtitle="Tank Water Level"
            progress="NULL"
            increase=""
            icon={
              <WavesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box> 
      </Box>
    </Box>
  );
};

export default Dashboard;
