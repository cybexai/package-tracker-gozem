import React from "react";
import CustomButton from "./CustomButton";
import DELIVERY_STATUS from "../utils/deliveryStatus";

function CustomStatusButton({ status, onClick, title }) {
  const statusColor = () => {
    if (status === DELIVERY_STATUS.FAILED && title === "Failed") {
      return "#e16666";
    } else if (status === DELIVERY_STATUS.DELIVERED && title === "Delivered") {
      return "#169237";
    } else if (
      status === DELIVERY_STATUS.IN_TRANSIT &&
      title === "In-Transit"
    ) {
      return "#ff9900";
    } else if (status === DELIVERY_STATUS.PICKED_UP && title === "Picked Up") {
      return "#6fa8db";
    } else {
      return "#fff";
    }
  };
  return (
    <CustomButton
      title={title}
      titleStyle={{ color: "#000" }}
      rootStyle={{
        backgroundColor: statusColor(),
        border: "1px solid #c2c2c2",
      }}
      onClick={onClick}
    />
  );
}

CustomStatusButton.propTypes = {};

export default CustomStatusButton;
