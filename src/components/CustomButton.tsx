import React from "react";
import { Button, Grid } from "@mui/material";
import { THEME } from "../constants/styles";

type CustomButtonType = {
  isDisabled: boolean | undefined;
  onClick: () => void;
  startIcon?: React.ReactNode;
  text: string;
  color?: string;
  hover?: string;
};

const CustomButton: React.FC<CustomButtonType> = ({
  isDisabled,
  onClick,
  startIcon,
  text,
  color,
  hover,
}) => {
  return (
    <Grid item>
      <Button
        variant='contained'
        sx={{
          color: "white",
          backgroundColor: color ? color : THEME.primary,
          "&:hover": {
            backgroundColor: hover ? hover : THEME.hover,
          },
          mt: 2,
        }}
        disabled={isDisabled}
        size='small'
        onClick={onClick}
        fullWidth
        startIcon={startIcon}>
        {text}
      </Button>
    </Grid>
  );
};

export default CustomButton;
