import { useState } from "react";

import {
    Box,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Typography,
  } from "@mui/material";
  import { Formik } from "formik";
  import * as yup from "yup";
  import useMediaQuery from "@mui/material/useMediaQuery";
  import axios from "axios"; // Import axios to make API requests
  import InputAdornment from "@mui/material/InputAdornment";
  import Header from "../../../components/Header";
  
  const RiceRecommendationForm = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    // State to hold environmental data
    const [environmentData, setEnvironmentData] = useState({
      tankWaterLevel: "",
      soilMoisture: "",
      temperature: "",
      weather: "",
    });
  
    // State to hold rice variations data
    const [riceVariations, setRiceVariations] = useState([]);
  
    // Fetch environment data based on selected location
    const fetchEnvironmentData = async (location) => {
      try {
        const response = await axios.get(`API_ENDPOINT/environment?location=${location}`);
        setEnvironmentData(response.data);
        fetchRiceVariations(response.data); // Call function to fetch rice variations
      } catch (error) {
        console.error("Error fetching environment data:", error);
      }
    };
  
    // Fetch recommended rice variations based on environment data
    const fetchRiceVariations = async (environmentData) => {
      try {
        const response = await axios.post('API_ENDPOINT/rice-recommendation', environmentData);
        setRiceVariations(response.data);
      } catch (error) {
        console.error("Error fetching rice variations:", error);
      }
    };
  
    const handleFormSubmit = async (values) => {
      console.log("Form Values:", values);
      // Call the submit function here, if needed
    };
  
    return (
      <Box m="20px">
        <Header title="Rice Variety Recommendation" subtitle="Recommend rice varieties based on location" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                {/* Location Selection */}
                <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel>Location</InputLabel>
                  <Select
                    id="location"
                    name="location"
                    value={values.location}
                    onChange={(event) => {
                      handleChange(event);
                      fetchEnvironmentData(event.target.value); // Fetch data when location changes
                    }}
                    onBlur={handleBlur}
                    error={!!touched.location && !!errors.location}
                  >
                    {/* Sample Locations - Replace with dynamic data */}
                    <MenuItem value="Location1">Location 1</MenuItem>
                    <MenuItem value="Location2">Location 2</MenuItem>
                  </Select>
                </FormControl>
  
                {/* Tank Water Level */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Tank Water Level"
                  value={environmentData.tankWaterLevel}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">L</InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 2" }}
                />
  
                {/* Soil Moisture */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Soil Moisture"
                  value={environmentData.soilMoisture}
                  disabled
                  sx={{ gridColumn: "span 2" }}
                />
  
                {/* Temperature */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Temperature"
                  value={environmentData.temperature}
                  disabled
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">°C</InputAdornment>
                    ),
                  }}
                  sx={{ gridColumn: "span 1" }}
                />
  
                {/* Weather */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Weather"
                  value={environmentData.weather}
                  disabled
                  sx={{ gridColumn: "span 1" }}
                />
  
                {/* Display Recommended Rice Variations */}
                <Box gridColumn="span 4">
                  <Typography variant="h6" mt={2}>
                    Recommended Rice Variations:
                  </Typography>
                  <ul>
                    {riceVariations.map((variation, index) => (
                      <li key={index}>{variation.name}</li>
                    ))}
                  </ul>
                </Box>
              </Box>
  
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Get Recommendations
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  // Validation Schema for the form
  const checkoutSchema = yup.object().shape({
    location: yup.string().required("Location is required"),
  });
  
  // Initial values for the form
  const initialValues = {
    location: "",
  };
  
  export default RiceRecommendationForm;
  