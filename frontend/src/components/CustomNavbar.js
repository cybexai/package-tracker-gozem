import { Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { COLORS } from "../utils/colors";
import CustomButton from "./CustomButton";

export default function CustomNavbar({ source }) {
  const navigate = useNavigate();
  return (
    <Stack
      direction={{ xs: "column", md: "row", lg: "row" }}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={2}
    >
      <CustomButton
        title={"Web Tracker"}
        titleStyle={{
          color: source === "tracker" ? COLORS.primary : COLORS.white,
          fontWeight: "600",
        }}
        rootStyle={{
          backgroundColor: source === "tracker" ? COLORS.white : "transparent",
          border: `2px solid #fff`,
          borderRadius: 2,
        }}
        onClick={() => {
          navigate("/");
        }}
      />
      <CustomButton
        title={"Web Driver"}
        titleStyle={{
          color: source === "driver" ? COLORS.primary : COLORS.white,
          fontWeight: "600",
        }}
        rootStyle={{
          backgroundColor: source === "driver" ? COLORS.white : "transparent",
          border: `2px solid #fff`,
          borderRadius: 2,
        }}
        onClick={() => {
          navigate("/driver");
        }}
      />
      <CustomButton
        title={"Web Admin"}
        titleStyle={{
          color: source === "admin" ? COLORS.primary : COLORS.white,
          fontWeight: "600",
        }}
        rootStyle={{
          backgroundColor: source === "admin" ? COLORS.white : "transparent",
          border: `2px solid #fff`,
          borderRadius: 2,
        }}
        onClick={() => {
          navigate("/admin");
        }}
      />
    </Stack>
  );
}
