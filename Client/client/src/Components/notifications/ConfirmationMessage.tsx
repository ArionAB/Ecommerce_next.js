import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import React, { FC } from "react";

const ConfirmationMessage: FC<{
  message: string;
  open: boolean;
  currentTarget: any;
  close: Function;
  setCurrentTarget: Function;
  deleteProduct: any;
}> = ({
  message,
  open,
  currentTarget,
  close,
  setCurrentTarget,
  deleteProduct,
}) => {
  const handleClose = () => {
    close(false);
    setCurrentTarget(null);
  };

  return (
    <Popover
      open={open}
      anchorEl={currentTarget}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
    >
      <Typography sx={{ p: 2 }}>{message}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "1rem",
        }}
      >
        <Button variant="contained" color="error" onClick={deleteProduct}>
          Delete
        </Button>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Popover>
  );
};

export default ConfirmationMessage;
