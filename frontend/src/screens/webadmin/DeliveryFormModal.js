import React, { useEffect, useState } from "react";
import { Box, MenuItem, Modal, OutlinedInput, Select, Stack, Typography } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CustomTextInput, FormModalTitle } from "../../components";
import { deliveryYup } from "../../utils/yupValidation";
import { createAsyncDelivery, updateAsyncDelivery } from "../../store/features/deliverySlice";
import DELIVERY_STATUS from "../../utils/deliveryStatus";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 400, md: 650, lg: 700 },
  bgcolor: "background.paper",
  borderRadius: 2,
};

const MenuProps = {
  PaperProps: {
    style: {
      width: 150,
    },
  },
};

function DeliveryFormModal({ data, open, onClose }) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const packages = useSelector((state) => state.package);

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
      location: packages[values.package_id]?.to_location,
      status: DELIVERY_STATUS.OPEN
    };
    
    if (values.delivery_id !== "") {
      dispatch(updateAsyncDelivery({ data: toSave, callback, onError }));
    } else {
      dispatch(createAsyncDelivery({ data: toSave, callback, onError }));
    }
  }

  const { values, handleSubmit, setValues, errors, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        delivery_id: "",
        package_id: "",
      },
      validationSchema: Yup.object().shape(deliveryYup),
      onSubmit(values) {
        _handleSubmit(values);
      },
    });

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
            title={`${values.delivery_id ? "Update" : "Create"} a delivery`}
            closeModal={handleClose}
            isLoading={loading}
          />
          <Box p={4} pt={0} style={{ maxHeight: "85vh", overflow: "auto" }}>
            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <div
                style={{
                  marginTop: 15,
                  width: "100%",
                  position: "relative",
                }}
              >
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
                  Package
                </Typography>
                <Select
                  disableUnderline
                  variant="standard"
                  size="small"
                  value={values.package_id}
                  onChange={({ target }) => setFieldValue("package_id", target.value)}
                  input={<OutlinedInput />}
                  style={{
                    backgroundColor: "#fff",
                    width: "100%",
                  }}
                  MenuProps={MenuProps}
                >
                  {Object.values(packages).map((_package) => (
                    <MenuItem key={_package.package_id} value={_package.package_id}>
                      {_package.description}
                    </MenuItem>
                  ))}
                </Select>
              </div>
           
            </Stack>

          </Box>
        </Box>
      </form>
    </Modal>
  );
}

DeliveryFormModal.propTypes = {};

export default DeliveryFormModal;
