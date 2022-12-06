import { Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { COLORS } from "../utils/colors";

export default function CustomButton({
  title,
  rootStyle,
  titleStyle,
  onClick,
  type = "button",
  isLoading,
}) {
  return (
    <Button
      variant="raised"
      type={type}
      sx={{
        backgroundColor: isLoading ? "#c2c2c250" : COLORS.primary,
        color: COLORS.white,
        paddingLeft: 2,
        paddingRight: 2,
        alignItems: "center",
        ":hover": {
          bgcolor: "#c2c2c299",
          color: '#000'
        },
        ...rootStyle,
      }}
      onClick={onClick}
      disabled={isLoading}
    >
      {title && !isLoading ? (
        <Typography textTransform={"none"} sx={{ ...titleStyle }}>
          {title}
        </Typography>
      ) : null}
      {isLoading ? <CircularProgress size={20} /> : null}
    </Button>
  );
}
