import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

const ConfirmDialog = ({ open, handleClose, handleConfirm, title, content }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        sx: {
          backgroundColor: "#001F3F", // Set background color of the dialog
          color: "#ffffff", // Set text color
        },
      }}
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="secondary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
