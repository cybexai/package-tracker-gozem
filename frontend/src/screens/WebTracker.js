import React, { useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import socketIO from "socket.io-client";
import { COLORS } from "../utils/colors";
import {
  CustomButton,
  CustomDeliveryAccordion,
  CustomNavbar,
  CustomPackageAccordion,
  CustomTextInput,
} from "../components";
import { listAsyncPackageByID } from "../store/features/packageSlice";
import CustomMapContainer from "../components/CustomMapContainer";
import EVENT_TYPES from "../utils/eventTypes";
import { SOCKET_SERVER } from "../utils/server";

function WebTracker() {
  const [search, setSearch] = useState("");
  const [currentPackage, setCurrentPackage] = useState({});
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);

  const socket = socketIO.connect(SOCKET_SERVER);

  const onSearch = async () => {
    if (search !== "") {
      const res = await listAsyncPackageByID(search);
      setCurrentPackage(res);
    }
  };

  useEffect(() => {
    socket.on(EVENT_TYPES.DELIVERY_UPDATED, (data) =>
      setCurrentPackage(JSON.parse(data))
    );
  }, [socket]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <Box
      p={4}
      px={20}
      sx={{
        minHeight: "100vh",
      }}
    >
      <CustomNavbar source={"tracker"} />
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
          WEB TRACKER
        </Typography>

        <Stack
          direction={{ xs: "column", md: "row", lg: "row" }}
          alignItems={"center"}
          spacing={2}
          sx={{
            mb: 1,
            mt: 5,
          }}
        >
          <CustomTextInput
            placeholder={"Enter Package ID"}
            value={search}
            onChange={(value) => setSearch(value)}
            rootStyle={{ marginTop: 0, height: "auto" }}
          />
          <CustomButton
            title={"Track"}
            onClick={onSearch}
            rootStyle={{ width: 300 }}
          />
        </Stack>

        {currentPackage?.package?.package_id ? (
          <Stack direction={"row"} justifyContent={"space-between"} mt={5}>
            <Box style={{ width: "50%" }}>
              <CustomPackageAccordion data={currentPackage?.package} />
              {currentPackage?.delivery ? (
                <CustomDeliveryAccordion data={currentPackage?.delivery} />
              ) : null}
            </Box>

            {currentPackage?.package?.to_location ? (
              <CustomMapContainer
                data={currentPackage}
                currentLocation={{ lat: latitude, lng: longitude }}
              />
            ) : (
              <></>
            )}
          </Stack>
        ) : (
          <Stack py={3}>
            <Typography>Nothing found</Typography>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}

export default WebTracker;
