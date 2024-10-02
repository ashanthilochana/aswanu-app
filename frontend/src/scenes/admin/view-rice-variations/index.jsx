import React, { useEffect, useState } from "react";
import { Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import axios from "axios";
import EditRiceVariations from "../edit-rice-variations-popup/index"; // Import the Edit modal
import ConfirmDialog from "../../../components/ConfirmDialog"; // Import the confirmation dialog component

const ViewRiceVariations = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [riceVariations, setRiceVariations] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false); // State for modal visibility
  const [selectedRiceVariation, setSelectedRiceVariation] = useState(null); // State for the selected rice variation
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State for delete confirmation dialog
  const [riceVariationIdToDelete, setRiceVariationIdToDelete] = useState(null); // Store the rice variation ID to be deleted

  useEffect(() => {
    fetchRiceVariations();
  }, []);

  const fetchRiceVariations = async () => {
    try {
      const response = await axios.get("http://localhost:5300/api/variation/get");
      const variations = response.data.map((variation, index) => ({
        ...variation,
        id: variation.vID || index, // Use the index if id is missing
      }));
      setRiceVariations(variations);
    } catch (error) {
      console.error("Error fetching rice variations:", error);
    }
  };

  // Open delete confirmation dialog
  const handleOpenDeleteDialog = (id) => {
    setRiceVariationIdToDelete(id);
    setOpenDeleteDialog(true);
  };

  // Close delete confirmation dialog
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setRiceVariationIdToDelete(null);
  };

  // Handle the delete action once confirmed
  const handleConfirmDelete = async () => {
    if (riceVariationIdToDelete) {
      try {
        await axios.delete(`http://localhost:5300/api/variation/delete/${riceVariationIdToDelete}`);
        const updatedVariations = riceVariations.filter((variation) => variation.vID !== riceVariationIdToDelete);
        setRiceVariations(updatedVariations);
        handleCloseDeleteDialog(); // Close the dialog after deletion
      } catch (error) {
        console.error("Error deleting rice variation data:", error);
      }
    }
  };

  // Handle the "Edit" button click
  const handleEditClick = (variation) => {
    setSelectedRiceVariation(variation); // Set the selected rice variation data
    setOpenEditModal(true); // Open the modal
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "variantName", headerName: "Rice Variant Name", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "growingSeason", headerName: "Growing Season", flex: 1 },
    { field: "diseaseResistance", headerName: "Disease Resistance", flex: 1 },
    { field: "environmentalSuitability", headerName: "Environmental Suitability", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="edit"
            onClick={() => handleEditClick(params.row)} // Pass the selected row data
          >
            <EditIcon />
          </IconButton>
          <IconButton
            key={`delete-${params.id}`}
            aria-label="delete"
            onClick={() => handleOpenDeleteDialog(params.id)} // Open delete dialog on click
          >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="RICE VARIATIONS" subtitle="List of Rice Variations" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
        }}
      >
        <DataGrid
          rows={riceVariations}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>

      {/* Edit Rice Variations Popup */}
      {openEditModal && (
        <EditRiceVariations
          open={openEditModal}
          onClose={() => setOpenEditModal(false)}
          selectedVariation={selectedRiceVariation}
          refreshData={fetchRiceVariations} // Fetch the updated data after successful edit
          
        />
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={openDeleteDialog}
        handleClose={handleCloseDeleteDialog}
        handleConfirm={handleConfirmDelete}
        title="Confirm Delete"
        content="Are you sure you want to delete this rice variation? This action cannot be undone."
      />
    </Box>
  );
};

export default ViewRiceVariations;
