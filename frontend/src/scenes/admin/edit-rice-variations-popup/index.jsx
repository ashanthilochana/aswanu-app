import React from "react";
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
import axios from "axios";

const EditRiceVariationPopup = ({ open, onClose, selectedVariation, refreshData }) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    console.log("Form values:", values); // Log the values
    try {
      await axios.put(`http://localhost:5300/api/variation/update/${selectedVariation.vID}`, values);
      window.alert("Rice variation updated successfully!");
      refreshData(); // Refresh the rice variation list after updating
      onClose(); // Close the modal after successful edit
    } catch (error) {
      console.error("Error updating rice variation data:", error);
      window.alert("Error updating the rice variation. Please try again.");
    }
  };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Box m="20px" sx={{ bgcolor: "background.paper", p: 4, maxWidth: 800, mx: "auto", mt: 15 }}>
        <Header title="Edit Rice Variation" subtitle="Modify Rice Variation Details" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={selectedVariation || initialValues} // Use selectedVariation if available
          validationSchema={riceVariationSchema}
          enableReinitialize // This will allow the form to reinitialize when selectedVariation changes
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
                  label="Rice Variant Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.variantName}
                  name="variantName"
                  error={!!touched.variantName && !!errors.variantName}
                  helperText={touched.variantName && errors.variantName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={!!touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                  sx={{ gridColumn: "span 2" }}
                />
                
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="season-select-label">Growing Season</InputLabel>
                  <Select
                    labelId="season-select-label"
                    id="growing-season"
                    name="growingSeason"
                    value={values.growingSeason}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.growingSeason && !!errors.growingSeason}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="yala">Yala</MenuItem>
                    <MenuItem value="maha">Maha</MenuItem>
                  </Select>
                  {touched.growingSeason && errors.growingSeason && (
                    <p style={{ color: "red" }}>{errors.growingSeason}</p>
                  )}
                </FormControl>

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Disease Resistance"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.diseaseResistance}
                  name="diseaseResistance"
                  error={!!touched.diseaseResistance && !!errors.diseaseResistance}
                  helperText={touched.diseaseResistance && errors.diseaseResistance}
                  sx={{ gridColumn: "span 2" }}
                />

                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Environmental Suitability"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.environmentalSuitability}
                  name="environmentalSuitability"
                  error={!!touched.environmentalSuitability && !!errors.environmentalSuitability}
                  helperText={touched.environmentalSuitability && errors.environmentalSuitability}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Update Rice Variation
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

const riceVariationSchema = yup.object().shape({
  variantName: yup.string().required("Required"),
  category: yup.string().required("Required"),
  growingSeason: yup.string().required("Required"),
  diseaseResistance: yup.string().required("Required"),
  environmentalSuitability: yup.string().required("Required"),
});

const initialValues = {
  variantName: "",
  category: "",
  growingSeason: "",
  diseaseResistance: "",
  environmentalSuitability: "",
};

export default EditRiceVariationPopup;
