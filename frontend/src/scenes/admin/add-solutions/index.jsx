import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import axios from "axios";

const AddSolution = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    console.log(values);

    axios
      .post("http://localhost:5300/api/solutions/add", values)
      .then((response) => {
        console.log("Form data submitted successfully:", response.data);
        // Handle success (e.g., clear the form or show a success message)
        window.alert("Solution added successfully!");
      })
      .catch((error) => {
        console.error("Error submitting form data:", error);
        // Handle error (e.g., show an error message)
        window.alert("Error adding the solution. Please try again.");
      });
  };
      
  return (
    <Box m="20px">
      <Header title="Add New Solution" subtitle="Create a New Solution for Disease" />
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
              {/* Solution Name Field */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Solution Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.solutionName}
                name="solutionName"
                error={!!touched.solutionName && !!errors.solutionName}
                helperText={touched.solutionName && errors.solutionName}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Disease Category Field */}
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="disease-category-label">Disease Category</InputLabel>
                <Select
                  labelId="disease-category-label"
                  id="disease-category"
                  name="diseaseCategory"
                  value={values.diseaseCategory}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.diseaseCategory && !!errors.diseaseCategory}
                >
                  <MenuItem value="Rice Blast">Rice Blast</MenuItem>
                  <MenuItem value="Sheath Blight">Sheath Blight</MenuItem>
                  <MenuItem value="Bacterial Leaf Blight">Bacterial Leaf Blight</MenuItem>
                </Select>
              </FormControl>

              {/* Application Method Field */}
              <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                <InputLabel id="application-method-label">Application Method</InputLabel>
                <Select
                  labelId="application-method-label"
                  id="application-method"
                  name="applicationMethod"
                  value={values.applicationMethod}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={!!touched.applicationMethod && !!errors.applicationMethod}
                >
                  <MenuItem value="Spray">Spray</MenuItem>
                  <MenuItem value="Soil Application">Soil Application</MenuItem>
                  <MenuItem value="Seed Treatment">Seed Treatment</MenuItem>
                </Select>
              </FormControl>

              {/* Dosage Field */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Dosage (per hectare)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.dosage}
                name="dosage"
                error={!!touched.dosage && !!errors.dosage}
                helperText={touched.dosage && errors.dosage}
                InputProps={{
                  endAdornment: <InputAdornment position="end">ml</InputAdornment>,
                }}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Application Frequency Field */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Application Frequency"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.applicationFrequency}
                name="applicationFrequency"
                error={!!touched.applicationFrequency && !!errors.applicationFrequency}
                helperText={touched.applicationFrequency && errors.applicationFrequency}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Application Interval Field */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Application Interval (days)"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.applicationInterval}
                name="applicationInterval"
                error={!!touched.applicationInterval && !!errors.applicationInterval}
                helperText={touched.applicationInterval && errors.applicationInterval}
                InputProps={{
                  endAdornment: <InputAdornment position="end">days</InputAdornment>,
                }}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Cost Per Hectare Field */}
              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Cost per Hectare"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.costPerHectare}
                name="costPerHectare"
                error={!!touched.costPerHectare && !!errors.costPerHectare}
                helperText={touched.costPerHectare && errors.costPerHectare}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Rs</InputAdornment>,
                }}
                sx={{ gridColumn: "span 2" }}
              />

              {/* Description Field */}
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 4" }}
              />
            </Box>

            {/* Submit Button */}
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Create New Solution
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  solutionName: yup.string().required("Solution Name is required"),
  diseaseCategory: yup.string().required("Disease Category is required"),
  applicationMethod: yup.string().required("Application Method is required"),
  dosage: yup.number().required("Dosage is required").positive().integer(),
  applicationFrequency: yup.number().required("Application Frequency is required").positive().integer(),
  applicationInterval: yup.number().required("Application Interval is required").positive().integer(),
  costPerHectare: yup.number().required("Cost per hectare is required").positive(),
  description: yup.string().required("Description is required"),
});

const initialValues = {
  solutionName: "",
  diseaseCategory: "",
  applicationMethod: "",
  dosage: "",
  applicationFrequency: "",
  applicationInterval: "",
  costPerHectare: "",
  description: "",
};

export default AddSolution;
