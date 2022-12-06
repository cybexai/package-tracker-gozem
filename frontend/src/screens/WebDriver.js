import React, { useCallback, useEffect, useState } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import socketIO from "socket.io-client";
import { COLORS } from "../utils/colors";
import {
  CustomButton,
  CustomDeliveryAccordion,
  CustomNavbar,
  CustomPackageAccordion,
  CustomStatusButton,
  CustomTextInput,
} from "../components";
import {
  listAsyncDeliveryByID,
  updateAsyncDelivery,
} from "../store/features/deliverySlice";
import CustomMapContainer from "../components/CustomMapContainer";
import DELIVERY_STATUS from "../utils/deliveryStatus";
import EVENT_TYPES from "../utils/eventTypes";
import { SOCKET_SERVER } from "../utils/server";

function WebDriver() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [currentDelivery, setCurrentDelivery] = useState({});

  const socket = socketIO.connect(SOCKET_SERVER);

  const onSearch = async () => {
    if (search !== "") {
      const res = await listAsyncDeliveryByID(search);
      setCurrentDelivery(res);
    }
  };

  const onUpdate = useCallback(
    async (status) => {
      if (currentDelivery?.delivery) {
        const data = {
          ...currentDelivery.delivery,
          status,
        };
        socket.emit(EVENT_TYPES.STATUS_CHANGED, JSON.stringify(data));
      }
    },
    [currentDelivery.delivery, socket]
  );

  useEffect(() => {
    socket.on(EVENT_TYPES.DELIVERY_UPDATED, (data) =>
      setCurrentDelivery(JSON.parse(data))
    );
  }, [socket]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        socket.emit(
          EVENT_TYPES.LOCATION_CHANGED,
          JSON.stringify({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        );
      });
    }, 20000);
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <Box
      p={4}
      px={20}
      sx={{
        minHeight: "100vh",
      }}
    >
      <CustomNavbar source={"driver"} />
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
          WEB DRIVER
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
            placeholder={"Enter Delivery ID"}
            value={search}
            onChange={(value) => setSearch(value)}
            rootStyle={{ marginTop: 0, height: "auto" }}
          />
          <CustomButton
            title={"Submit"}
            onClick={onSearch}
            rootStyle={{ width: 300 }}
          />
        </Stack>

        {currentDelivery?.delivery ? (
          <Stack direction={"row"} justifyContent={"space-between"} mt={5}>
            <Box style={{ width: "50%" }}>
              <Stack direction={"row"} justifyContent={"space-evenly"} mb={3}>
                <CustomStatusButton
                  title="Picked Up"
                  status={currentDelivery?.delivery?.status}
                  onClick={() => onUpdate(DELIVERY_STATUS.PICKED_UP)}
                />
                <CustomStatusButton
                  title="In-Transit"
                  status={currentDelivery?.delivery?.status}
                  onClick={() => onUpdate(DELIVERY_STATUS.IN_TRANSIT)}
                />
                <CustomStatusButton
                  title="Delivered"
                  status={currentDelivery?.delivery?.status}
                  onClick={() => onUpdate(DELIVERY_STATUS.DELIVERED)}
                />
                <CustomStatusButton
                  title="Failed"
                  status={currentDelivery?.delivery?.status}
                  onClick={() => onUpdate(DELIVERY_STATUS.FAILED)}
                />
              </Stack>
              <CustomPackageAccordion data={currentDelivery?.package} />
              <CustomDeliveryAccordion data={currentDelivery?.delivery} />
            </Box>

            <CustomMapContainer
              data={currentDelivery}
              currentLocation={{ lat: latitude, lng: longitude }}
            />
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

export default WebDriver;
