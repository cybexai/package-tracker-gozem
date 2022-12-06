import React from "react";
import { InputAdornment, TextField, Typography } from "@mui/material";
import { COLORS } from "../utils/colors";

const CustomTextInput = ({
  title,
  type = "text",
  onChange,
  errorMessage,
  required,
  disabled,
  value,
  icon,
  endIcon,
  onClick,
  inputStyle,
  rootStyle,
  placeholder,
  ...rest
}) => {
  return (
    <div
      style={{
        marginTop: 15,
        width: "100%",
        position: "relative",
        // height: 100,
        ...rootStyle,
      }}
    >
      {title ? (
        <Typography
          color="black"
          sx={{
            fontSize: {
              xs: 12,
              md: 14,
            },
            fontWeight: 600,
            mb: 1,
          }}
        >
          {title}
        </Typography>
      ) : null}
      <TextField
        placeholder={placeholder || title}
        type={type}
        required={required}
        color="secondary"
        size="small"
        className="inputField"
        variant="outlined"
        style={{
          width: "100%",
          backgroundColor: "#fff",
          ...inputStyle,
        }}
        InputProps={{
          style: { borderRadius: 4 },
          sx: { fontSize: { xs: 12, md: 14 } },
          startAdornment: (
            <InputAdornment position="start">{icon}</InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">{endIcon}</InputAdornment>
          ),
        }}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        onClick={onClick}
        {...rest}
      />
      {/* {errorMessage !== "" ? (
        <small style={{ color: COLORS.red, fontSize: 10 }}>
          {errorMessage}
        </small>
      ) : null} */}
    </div>
  );
};

export default CustomTextInput;
