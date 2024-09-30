import React from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Modal,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import axios from "axios";

const EditSolutionPopup = ({ open, onClose, selectedSolution, refreshData }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      await axios.put(
        `http://localhost:5300/api/solutions/update/${selectedSolution.solutionId}`,
        values
      );
      window.alert("Solution updated successfully!");
      refreshData(); // Refresh the solution list after updating
      onClose(); // Close the modal after successful edit
    } catch (error) {
      console.error("Error updating solution:", error);
      window.alert("Error updating the solution. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box m="20px" sx={{ bgcolor: "background.paper", p: 4, maxWidth: 800, mx: "auto", mt: 5 }}>
        <Header title="Edit Solution" subtitle="Modify Solution Details" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={selectedSolution || initialValues}
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
                  label="Solution ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.solutionId}
                  name="solutionId"
                  error={!!touched.solutionId && !!errors.solutionId}
                  helperText={touched.solutionId && errors.solutionId}
                  sx={{ gridColumn: "span 2" }}
                  disabled
                />

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

                <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel>Disease Category</InputLabel>
                  <Select
                    value={values.diseaseCategory}
                    name="diseaseCategory"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.diseaseCategory && !!errors.diseaseCategory}
                  >
                    <MenuItem value="Rice Blast">Rice Blast</MenuItem>
                    <MenuItem value="Sheath Blight">Sheath Blight</MenuItem>
                    <MenuItem value="Bacterial Leaf Blight">Bacterial Leaf Blight</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel>Application Method</InputLabel>
                  <Select
                    value={values.applicationMethod}
                    name="applicationMethod"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.applicationMethod && !!errors.applicationMethod}
                  >
                    <MenuItem value="Spray">Spray</MenuItem>
                    <MenuItem value="Soil Application">Soil Application</MenuItem>
                    <MenuItem value="Seed Treatment">Seed Treatment</MenuItem>
                  </Select>
                </FormControl>

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

                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Cost per hectare"
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

              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update Solution
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
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
  solutionId: "",
  solutionName: "",
  diseaseCategory: "",
  applicationMethod: "",
  dosage: "",
  applicationFrequency: "",
  applicationInterval: "",
  costPerHectare: "",
  description: "",
};

export default EditSolutionPopup;
