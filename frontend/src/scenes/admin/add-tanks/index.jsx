import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios"; // Import axios to make API requests

const AddTank = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      // Make a POST request to the backend API to add a new tank (no Authorization needed)
      const response = await axios.post("/api/tank/add", values);
  
      if (response.data.success) {
        alert("Tank added successfully!");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error adding tank:", error);
      alert("Failed to add the tank. Please try again.");
    }
  };
  

  return (
    <Box m="20px">
      <Header title="Add New Tank" subtitle="Create a New Tank Profile" />
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
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tank Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tankName}
                name="tankName"
                error={!!touched.tankName && !!errors.tankName}
                helperText={touched.tankName && errors.tankName}
                sx={{ gridColumn: "span 2" }}
              />

              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  District/Province
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={values.district}
                  name="district"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.district && !!errors.district}
                  helperText={touched.district && errors.district}
                >
                  <MenuItem value="River">River</MenuItem>
                  <MenuItem value="Rainwater">Rainwater</MenuItem>
                  <MenuItem value="Groundwater">Groundwater</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Tank Capacity"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.tankCapacity}
                name="tankCapacity"
                error={!!touched.tankCapacity && !!errors.tankCapacity}
                helperText={touched.tankCapacity && errors.tankCapacity}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">L</InputAdornment>
                  ),
                }}
                sx={{ gridColumn: "span 1" }}
              />

              <FormControl variant="filled" sx={{ gridColumn: "span 1" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Water Source Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={values.sourceType}
                  name="sourceType"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.sourceType && !!errors.sourceType}
                  helperText={touched.sourceType && errors.sourceType}
                >
                  <MenuItem value="River">River</MenuItem>
                  <MenuItem value="Rainwater">Rainwater</MenuItem>
                  <MenuItem value="Groundwater">Groundwater</MenuItem>
                </Select>
              </FormControl>

              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Tank Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={values.tankStatus}
                  name="tankStatus"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.tankStatus && !!errors.tankStatus}
                  helperText={touched.tankStatus && errors.tankStatus}
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Inactive">Inactive</MenuItem>
                  <MenuItem value="Under Maintenance">Under Maintenance</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                variant="filled"
                type="date"
                label="Installation Date"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.installationDate}
                name="installationDate"
                error={!!touched.installationDate && !!errors.installationDate}
                helperText={touched.installationDate && errors.installationDate}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Irrigated Area"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.irrigatedArea}
                name="irrigatedArea"
                error={!!touched.irrigatedArea && !!errors.irrigatedArea}
                helperText={touched.irrigatedArea && errors.irrigatedArea}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">acres</InputAdornment>
                  ),
                }}
                sx={{ gridColumn: "span 1" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Tank
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  tankName: yup.string().required("Tank Name is required"),
  district: yup.string().required("District/Province is required"),
  tankCapacity: yup
    .number()
    .required("Tank Capacity is required")
    .positive("Tank Capacity must be positive"),
  sourceType: yup.string().required("Water Source Type is required"),
  tankStatus: yup.string().required("Tank Status is required"),
  installationDate: yup.date().required("Installation Date is required"),
  irrigatedArea: yup
    .number()
    .required("Irrigated Area is required")
    .positive("Irrigated Area must be positive"),
});

const initialValues = {
  tankName: "",
  district: "",
  tankCapacity: "",
  sourceType: "",
  tankStatus: "",
  installationDate: "",
  irrigatedArea: "",
};

export default AddTank;
