import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../components";
import DeliveryFormModal from "./DeliveryFormModal";
import { COLORS } from "../../utils/colors";
import { listAsyncDelivery } from "../../store/features/deliverySlice";

const MenuProps = {
  PaperProps: {
    style: {
      width: 150,
    },
  },
};

function Delivery() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [loading, setLoading] = useState(false);
  const deliveries = useSelector((state) => Object.values(state.delivery));

  const toggleModal = () => setOpen(!open);

  const closeDetailModal = () => {
    setSelectedItem({});
    setDetailModal(false);
  };

  const callback = () => {};
  const onError = () => {};

  useEffect(() => {
    dispatch(listAsyncDelivery({ callback, onError }));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Stack direction={"row"} justifyContent={"flex-end"} mb={3}>
        <CustomButton title={"New Delivery"} onClick={toggleModal} />
      </Stack>
      {deliveries.length ? (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "600" }}>
                  #
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "600" }}>
                  Package ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Delivery ID
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Status
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deliveries.map((delivery, index) => (
                <TableRow
                  key={delivery.delivery_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {delivery.package_id}
                  </TableCell>
                  <TableCell align="center">{delivery.delivery_id}</TableCell>
                  <TableCell align="center">{delivery.status}</TableCell>
                  <TableCell align="center">
                    <Select
                      MenuProps={MenuProps}
                      disableUnderline
                      variant="standard"
                      sx={{ "& .MuiSelect-icon": { transform: "none" } }}
                      IconComponent={(props) => (
                        <MoreVertIcon
                          fontSize="large"
                          {...props}
                          style={{ color: "#161B38" }}
                        />
                      )}
                    >
                      <MenuItem
                        style={{
                          background: "white",
                          color: "#161928",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                        // onClick={() => toggleDetail(delivery)}
                      >
                        Details
                      </MenuItem>
                      <Divider sx={{ mx: 2 }} />
                      <MenuItem
                        style={{
                          background: "white",
                          color: "#161928",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                        // onClick={() => toggleEdit(delivery)}
                      >
                        Update
                      </MenuItem>
                      <Divider sx={{ mx: 2 }} />

                      <MenuItem
                        style={{
                          background: "white",
                          color: COLORS.red,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                        // onClick={() => openDelete(delivery)}
                      >
                        Delete
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Stack py={3}>
          <Typography>Nothing found</Typography>
        </Stack>
      )}

      {open && <DeliveryFormModal open={open} onClose={toggleModal} />}
    </Box>
  );
}

export default Delivery;
