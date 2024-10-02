import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Modal,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../../components/Header";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";

const EditTankPopup = ({ open, onClose, selectedTank, refreshData }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    try {
      await axios.put(`http://localhost:5300/api/tank/update/${selectedTank.tID}`, values);
      window.alert("Tank updated successfully!");
      refreshData(); // Refresh the tank list after updating
      onClose(); // Close the modal after successful edit
    } catch (error) {
      console.error("Error updating tank data:", error);
      window.alert("Error updating the tank. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box m="20px" sx={{ bgcolor: colors.blueAccent[900], p: 4, maxWidth: 800, mx: "auto", mt: 15 }}>
        <Header title="Edit Tank" subtitle="Modify Tank Details" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={selectedTank || initialValues}
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
                  sx={{ gridColumn: "span 2", mb: 2 }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="District/Province"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.district}
                  name="district"
                  error={!!touched.district && !!errors.district}
                  helperText={touched.district && errors.district}
                  sx={{ gridColumn: "span 2", mb: 2 }}
                />

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
                  sx={{ gridColumn: "span 1", mb: 2 }}
                />

                <FormControl variant="filled" sx={{ gridColumn: "span 1", mb: 2 }}>
                  <InputLabel>Water Source Type</InputLabel>
                  <Select
                    value={values.sourceType}
                    name="sourceType"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.sourceType && !!errors.sourceType}
                  >
                    <MenuItem value="River">River</MenuItem>
                    <MenuItem value="Rainwater">Rainwater</MenuItem>
                    <MenuItem value="Groundwater">Groundwater</MenuItem>
                  </Select>
                </FormControl>

                <FormControl variant="filled" sx={{ gridColumn: "span 2", mb: 2 }}>
                  <InputLabel>Tank Status</InputLabel>
                  <Select
                    value={values.tankStatus}
                    name="tankStatus"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.tankStatus && !!errors.tankStatus}
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
                  sx={{ gridColumn: "span 2", mb: 2 }}
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
                  sx={{ gridColumn: "span 1", mb: 2 }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="button" variant="contained" sx={{ mr: 2 }} onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" color="secondary" variant="contained">
                  Update Tank
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

export default EditTankPopup;
