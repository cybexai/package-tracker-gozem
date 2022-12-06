import React, { useEffect, useState } from "react";
import { Box, Modal, Stack } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { CustomTextInput, FormModalTitle } from "../../components";
import { packageYup } from "../../utils/yupValidation";
import {
  createAsyncPackage,
  updateAsyncPackage,
} from "../../store/features/packageSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 400, md: 650, lg: 700 },
  bgcolor: "background.paper",
  borderRadius: 2,
};

function PackageFormModal({ data, open, onClose }) {
  const dispatch = useDispatch();

  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    onClose();
    resetForm();
  };

  const callback = () => {
    handleClose();
    setLoading(false);
  };

  const onError = () => {
    setLoading(false);
  };

  async function _handleSubmit(values) {
    setLoading(true);

    let toSave = {
      ...values,
      from_location: {
        lng: Number(longitude),
        lat: Number(latitude),
      },
      to_location: {
        lng: Number(values.receiverLongitude),
        lat: Number(values.receiverLatitude),
      }
    };

    if (values.package_id !== "") {
      dispatch(updateAsyncPackage({ data: toSave, callback, onError }));
    } else {
      dispatch(createAsyncPackage({ data: toSave, callback, onError }));
    }
  }

  const { values, handleSubmit, setValues, errors, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        description: "",
        weight: "",
        width: "",
        height: "",
        depth: "",
        package_id: "",
        from_name: "",
        from_address: "",
        to_address: "",
        to_name: "",
        receiverLongitude: "",
        receiverLatitude: "",
      },
      validationSchema: Yup.object().shape(packageYup),
      onSubmit(values) {
        _handleSubmit(values);
      },
    });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <form onSubmit={handleSubmit}>
        <Box sx={style}>
          <FormModalTitle
            title={`${values.package_id ? "Update" : "Create"} a package`}
            closeModal={handleClose}
            isLoading={loading}
          />
          <Box p={4} pt={0} style={{ maxHeight: "85vh", overflow: "auto" }}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <CustomTextInput
                title={"Description"}
                value={values.description}
                id="description"
                description="description"
                onChange={(value) => setFieldValue("description", value)}
                errorMessage={errors.description}
              />
            </Stack>

            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <CustomTextInput
                title={"Weight (grams)"}
                value={values.weight}
                id="weight"
                name="weight"
                type="number"
                onChange={(value) => setFieldValue("weight", value)}
                errorMessage={errors.weight}
              />

              <CustomTextInput
                title={"Width (cm)"}
                value={values.width}
                id="width"
                name="width"
                type="number"
                onChange={(value) => setFieldValue("width", value)}
                errorMessage={errors.width}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <CustomTextInput
                title={"Height (cm)"}
                value={values.height}
                id="height"
                name="height"
                type="number"
                onChange={(value) => setFieldValue("height", value)}
                errorMessage={errors.height}
              />
              <CustomTextInput
                title={"Depth (cm)"}
                value={values.depth}
                id="depth"
                name="depth"
                type="number"
                onChange={(value) => setFieldValue("depth", value)}
                errorMessage={errors.depth}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <CustomTextInput
                title={"Sender name"}
                value={values.from_name}
                id="from_name"
                name="from_name"
                onChange={(value) => setFieldValue("from_name", value)}
                errorMessage={errors.from_name}
              />

              <CustomTextInput
                title={"Sender address"}
                value={values.from_address}
                id="from_address"
                name="from_address"
                onChange={(value) => setFieldValue("from_address", value)}
                errorMessage={errors.from_address}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <CustomTextInput
                title={"Sender location (Longitude)"}
                value={longitude}
                id="longitude"
                name="longitude"
                type="number"
                onChange={(value) => setFieldValue("longitude", value)}
              />
              <CustomTextInput
                title={"Sender location (Latitude)"}
                value={latitude}
                id="latitude"
                name="latitude"
                type="number"
                onChange={(value) => setFieldValue("latitude", value)}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <CustomTextInput
                title={"Receiver name"}
                value={values.to_name}
                id="to_name"
                name="to_name"
                onChange={(value) => setFieldValue("to_name", value)}
                errorMessage={errors.to_name}
              />

              <CustomTextInput
                title={"Receiver address"}
                value={values.to_address}
                id="to_address"
                name="to_address"
                onChange={(value) => setFieldValue("to_address", value)}
                errorMessage={errors.to_address}
              />
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <CustomTextInput
                title={"Receiver location (Longitude)"}
                value={values.receiverLongitude}
                id="receiverLongitude"
                name="receiverLongitude"
                type="number"
                onChange={(value) => setFieldValue("receiverLongitude", value)}
              />
              <CustomTextInput
                title={"Receiver location (Latitude)"}
                value={values.receiverLatitude}
                id="receiverLatitude"
                name="receiverLatitude"
                type="number"
                onChange={(value) => setFieldValue("receiverLatitude", value)}
              />
            </Stack>
          </Box>
        </Box>
      </form>
    </Modal>
  );
}

PackageFormModal.propTypes = {};

export default PackageFormModal;
