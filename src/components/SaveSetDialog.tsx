import SaveIcon from "@mui/icons-material/Save";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/CustomButton";
import { SERVICES } from "../constants/strings";

interface SaveSetDialogProps {
  showDialog: boolean;
  setShowDialog: (open: boolean) => void;
}

//TODO: global logic for other components
const SaveSetDialog: React.FC<SaveSetDialogProps> = ({
  showDialog,
  setShowDialog,
}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    setShowDialog(false);
    navigate("/");
  };

  return (
    <Dialog open={showDialog} onClick={handleClose}>
      <DialogTitle>{SERVICES.SAVE_SET}</DialogTitle>
      <DialogContent>
        <DialogContentText>{SERVICES.SAVE_SETS}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Grid pr={2} pb={2} mt={-2}>
          <CustomButton
            onClick={handleClose}
            startIcon={<SaveIcon />}
            text={SERVICES.SAVE_SET}
            isDisabled={false}
          />
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default SaveSetDialog;
