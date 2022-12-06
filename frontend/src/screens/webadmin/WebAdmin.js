import React, { useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";
import { COLORS } from "../../utils/colors";
import {
  CustomNavbar,
  TabPanel,
} from "../../components";
import Package from "./Package";
import Delivery from "./Delivery";

function WebAdmin() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //   useEffect(() => {
  //     dispatch(listAgents());
  //   }, [dispatch]);

  return (
    <Box
      p={4}
      px={20}
      sx={{
        minHeight: "100vh",
      }}
    >
      <CustomNavbar source={"admin"} />
      <Paper
        elevation={0}
        sx={{
          borderRadius: 3,
          // height: "600px",
          backgroundColor: "#fff",
          padding: 2,
          marginTop: 5,
          px: 5,
        }}
      >
        <img
          src={`/logo.png`}
          alt={"logo"}
          loading="lazy"
          style={{ width: "100%", height: 80, objectFit: "contain" }}
        />
        <Typography
          fontWeight="600"
          textAlign={"center"}
          color={COLORS.primary}
          fontSize={28}
        >
          WEB ADMIN
        </Typography>

        <Tabs
          TabIndicatorProps={{
            style: {
              backgroundColor: COLORS.primary,
              height: 8,
              borderRadius: 10,
            },
          }}
          value={value}
          onChange={handleChange}
          sx={{ mt: 3 }}
          centered
        >
          <Tab label="Packages" />
          <Tab label="Deliveries" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <Package />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Delivery />
        </TabPanel>
      </Paper>
    </Box>
  );
}

export default WebAdmin;
