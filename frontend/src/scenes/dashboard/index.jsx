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
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";

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

import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { socket } from "../../socket";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [realTimeData, setRealTimeData] = useState({
    temp: "0",
    tempStat: "Normal",
    soilMoisture: "0",
    soilMoistureStat: "Normal",
    rainfall: "0",
    rainfallStat: "Normal",
    humidity: "0",
    humidityStat: "Normal",
    security: "No Alerts",
    ldr: "0",
    tankWaterLevel: "0",
    tankWaterLevelStat: "Normal",
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
      console.log(data);

      setRealTimeData((prev) => {
        return {
          ...prev,
          temp: data.Sensors.Malabe.temp,
          tempStat: data.Sensors.Malabe.temp > 30 ? "High" : "Normal",
          soilMoisture: data.Sensors.Malabe.soilMoisture,
          soilMoistureStat: data.Sensors.Malabe.soilMoisture < 30 ? "Low" : "Normal",
          rainfall: data.Sensors.Malabe.rain,
          rainfallStat: data.Sensors.Malabe.rain > 30 ? "High" : "Normal",
          humidity: data.Sensors.Malabe.humidity,
          humidityStat: data.Sensors.Malabe.humidity > 30 ? "High" : "Normal",
          security: data.Sensors.Malabe.security === "true" ? "Alert" : "No Alerts",
          ldr: data.Sensors.Malabe.ldr,
          tankWaterLevel: data.Sensors.Malabe.tankWaterLevel,
          tankWaterLevelStat: data.Sensors.Malabe.tankWaterLevel < 30 ? "Low" : "Normal",
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
        <Header title="DASHBOARD" subtitle="ඔබව නැවතත් සාදරයෙන් පිලිගන්නෙමු" />

        {/* Created by us */}
        <Box display="flex">
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
            increase= {realTimeData.tempStat}
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
            title={realTimeData.soilMoisture}
            subtitle="Soil Moisture"
            progress="0.50"
            increase=  {realTimeData.soilMoistureStat}
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
            title={realTimeData.rainfall}
            subtitle="Weather"
            progress="0.30"
            increase= {realTimeData.rainfallStat}
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
            title={realTimeData.humidity}
            subtitle="Air Humidity"
            progress="0.80"
            increase= {realTimeData.humidityStat}
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
            title={realTimeData.security}
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
            title={realTimeData.tankWaterLevel}
            subtitle="Tank Water Level"
            progress="NULL"
            increase= {realTimeData.tankWaterLevelStat}
            icon={
              <WavesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Desease Detection
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                124
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Latest Desease Detections
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
