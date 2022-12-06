import React from "react";
import { Box, Typography } from "@mui/material";
import CustomButton from "./CustomButton";
import { COLORS } from "../utils/colors";
// import { Close, Save } from "@mui/icons-material";

function FormModalTitle({ title, closeModal, onConfirm, isLoading }) {
  return (
    <Box
      id="modal-modal-title"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomStyle: "solid",
        borderBottomColor: "#c2c2c250",
      }}
      // sx={{
      //   display: {xs: "block", md: "flex", lg: "flex" }
      // }}
      px={{ xs: 2, md: 4, lg: 4 }}
      pb={2}
      pt={2}
    >
      <Typography
        variant="h6"
        component="h2"
        style={{
          color: COLORS.primary,
          fontWeight: "550",
        }}
      >
        {title}
      </Typography>
      <div
        style={{
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        {!isLoading ? (
          <CustomButton
            title={"Cancel"}
            rootStyle={{
              backgroundColor: "#c2c2c2",
              marginRight: 2,
              paddingLeft: 3,
              paddingRight: 3,
            }}
            titleStyle={{ color: COLORS.black }}
            onClick={closeModal}
          />
        ) : null}

        <CustomButton
          title={"Save"}
          isLoading={isLoading}
          rootStyle={{ paddingLeft: 3, paddingRight: 3 }}
          onClick={onConfirm}
          type="submit"
        />
      </div>
    </Box>
  );
}

FormModalTitle.propTypes = {};

export default FormModalTitle;
