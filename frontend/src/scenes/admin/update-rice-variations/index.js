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
  import axios from "axios";
  import { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
  
  const UpdateRiceVariations = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { id } = useParams(); // Get the ID from the URL
    const navigate = useNavigate();
    const [initialValues, setInitialValues] = useState({
      variantName: "",
      category: "",
      growingSeason: "",
      diseaseResistance: "",
      environmentalSuitability: "",
    });
  
    // Fetch existing data to pre-fill the form
    useEffect(() => {
      const fetchRiceVariation = async () => {
        try {
          const response = await axios.get(`http://localhost:5300/api/variation/${id}`);
          console.log("Fetched rice variation:", response.data);
          setInitialValues(response.data); // Pre-fill form with existing data
        } catch (error) {
          console.error("Error fetching rice variation data:", error);
        }
      };
      fetchRiceVariation();
    }, [id]);
  
    const handleFormSubmit = (values) => {
      console.log(values);
  
      axios
        .put(`http://localhost:5300/api/variation/update/${id}`, values)
        .then((response) => {
          console.log("Form data updated successfully:", response.data);
          // Handle success (e.g., show a success message)
          window.alert("Rice variation updated successfully!");
          navigate("/view-rice-variations"); // Navigate back to the view page
        })
        .catch((error) => {
          console.error("Error updating form data:", error);
          // Handle error (e.g., show an error message)
        });
    };
  
    return (
      <Box m="20px">
        <Header title="UPDATE RICE VARIATION" subtitle="Update an Existing Rice Variant" />
  
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={riceVariationSchema}
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
    );
  };
  
  const riceVariationSchema = yup.object().shape({
    variantName: yup.string().required("Required"),
    category: yup.string().required("Required"),
    growingSeason: yup.string().required("Required"),
    diseaseResistance: yup.string().required("Required"),
    environmentalSuitability: yup.string().required("Required"),
  });
  
  export default UpdateRiceVariations;
  