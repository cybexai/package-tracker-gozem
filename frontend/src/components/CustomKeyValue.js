import React from "react";
import { Stack, Typography } from "@mui/material";

function CustomKeyValue({ title, value, titleStyle, valueStyle, rootStyle }) {
  return (
    <Stack style={{ alignItems:'flex-start',...rootStyle }}>
      <Typography sx={{ color: "#757575", fontSize: 14, ...titleStyle }}>
        {title}
      </Typography>
      <Typography sx={{ fontSize: 16,...valueStyle }}>{value}</Typography>
    </Stack>
  );
}

CustomKeyValue.propTypes = {};

export default CustomKeyValue;
