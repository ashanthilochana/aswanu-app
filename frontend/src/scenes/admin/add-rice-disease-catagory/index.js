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
  
  const AddRiceDiseaseCategory = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
  
    const handleFormSubmit = (values) => {
      console.log(values);
  
      axios
        .post("http://localhost:5300/api/disease-category/add", values)
        .then((response) => {
          console.log("Form data submitted successfully:", response.data);
          window.alert("Disease category added successfully!");
        })
        .catch((error) => {
          console.error("Error submitting form data:", error);
        });
    };
  
    return (
      <Box m="20px">
        <Header title="ADD RICE DISEASE CATEGORY" subtitle="Add a New Rice Disease Category" />
  
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={riceDiseaseCategorySchema}
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
                  label="Category Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.categoryName}
                  name="categoryName"
                  error={!!touched.categoryName && !!errors.categoryName}
                  helperText={touched.categoryName && errors.categoryName}
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
  
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="severity-select-label">Severity Level</InputLabel>
                  <Select
                    labelId="severity-select-label"
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
                  sx={{ gridColumn: "span 2" }}
                />
  
                <FormControl fullWidth variant="filled" sx={{ gridColumn: "span 2" }}>
                  <InputLabel id="status-select-label">Status</InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="status"
                    name="status"
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={!!touched.status && !!errors.status}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                  {touched.status && errors.status && (
                    <p style={{ color: "red" }}>{errors.status}</p>
                  )}
                </FormControl>
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  Add Disease Category
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    );
  };
  
  const riceDiseaseCategorySchema = yup.object().shape({
    categoryName: yup.string().required("Required"),
    description: yup.string().required("Required"),
    severityLevel: yup.string().required("Required"),
    symptoms: yup.string().required("Required"),
    preventionMethods: yup.string().required("Required"),
    region: yup.string().required("Required"),
    status: yup.string().required("Required"),
  });
  
  const initialValues = {
    categoryName: "",
    description: "",
    severityLevel: "",
    symptoms: "",
    preventionMethods: "",
    region: "",
    status: "",
  };
  
  export default AddRiceDiseaseCategory;
  