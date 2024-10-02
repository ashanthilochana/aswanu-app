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
  
  const AddRiceDiseaseDetails = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const handleFormSubmit = (values) => {
      console.log(values);
  
      axios
        .post("http://localhost:5300/api/disease/add", values)
        .then((response) => {
          console.log("Form data submitted successfully:", response.data);
          // Handle success (e.g., clear the form or show a success message)
          window.alert("Rice Disease added successfully!");
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
          // Handle error (e.g., show an error message)
        });
    };
  
    return (
      <Box m="20px">
        <Header title="ADD RICE DISEASE DETAILS" subtitle="Add New Rice Disease Details" />
  
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={riceDiseaseSchema}
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
                  label="Disease Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.diseaseName}
                  name="diseaseName"
                  error={!!touched.diseaseName && !!errors.diseaseName}
                  helperText={touched.diseaseName && errors.diseaseName}
                  sx={{ gridColumn: "span 2" }}
                />
  
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Affected Areas"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.affectedAreas}
                  name="affectedAreas"
                  error={!!touched.affectedAreas && !!errors.affectedAreas}
                  helperText={touched.affectedAreas && errors.affectedAreas}
                  sx={{ gridColumn: "span 2" }}
                />
  
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="severity-level-select-label">Severity Level</InputLabel>
                  <Select
                    labelId="severity-level-select-label"
                    id="severityLevel"
                    name="severityLevel"
                    value={values.severityLevel}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.severityLevel && !!errors.severityLevel}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                  </Select>
                  {touched.severityLevel && errors.severityLevel && (
                    <p style={{ color: "red" }}>{errors.severityLevel}</p>
                  )}
                </FormControl>
  
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Symptoms"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.symptoms}
                  name="symptoms"
                  error={!!touched.symptoms && !!errors.symptoms}
                  helperText={touched.symptoms && errors.symptoms}
                  sx={{ gridColumn: "span 4" }}
                />
  
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Prevention Methods"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.preventionMethods}
                  name="preventionMethods"
                  error={!!touched.preventionMethods && !!errors.preventionMethods}
                  helperText={touched.preventionMethods && errors.preventionMethods}
                  sx={{ gridColumn: "span 4" }}
                />
  
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Region"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.region}
                  name="region"
                  error={!!touched.region && !!errors.region}
                  helperText={touched.region && errors.region}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Add Rice Disease
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  const riceDiseaseSchema = yup.object().shape({
    diseaseName: yup.string().required("Required"),
    affectedAreas: yup.string().required("Required"),
    severityLevel: yup.string().required("Required"),
    symptoms: yup.string().required("Required"),
    preventionMethods: yup.string().required("Required"),
    region: yup.string().required("Required"),
  });
  
  const initialValues = {
    diseaseName: "",
    affectedAreas: "",
    severityLevel: "",
    symptoms: "",
    preventionMethods: "",
    region: "",
  };
  
  export default AddRiceDiseaseDetails;
  