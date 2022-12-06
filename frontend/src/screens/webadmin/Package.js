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
import PackageFormModal from "./PackageFormModal";
import { COLORS } from "../../utils/colors";
import { listAsyncPackage } from "../../store/features/packageSlice";

const MenuProps = {
  PaperProps: {
    style: {
      width: 150,
    },
  },
};

function Package() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const packages = useSelector((state) => Object.values(state.package));

  const toggleModal = () => setOpen(!open);

  const callback = () => {};
  const onError = () => {};

  useEffect(() => {
    dispatch(listAsyncPackage({ callback, onError }));
  }, [dispatch]);

  return (
    <Box p={4}>
      <Stack direction={"row"} justifyContent={"flex-end"} mb={3}>
        <CustomButton title={"New Package"} onClick={toggleModal} />
      </Stack>
      {packages.length ? (
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
                  Sender
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Sender Address
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Receiver
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: "600" }}>
                  Receiver Address
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {packages.map((_package, index) => (
                <TableRow
                  key={_package.package_id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="left">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align="left">
                    {_package.package_id}
                  </TableCell>
                  <TableCell align="center">{_package.from_name}</TableCell>
                  <TableCell align="center">{_package.from_address}</TableCell>
                  <TableCell align="center">{_package.to_name}</TableCell>
                  <TableCell align="center">{_package.to_address}</TableCell>
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
                        // onClick={() => toggleDetail(_package)}
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
                        // onClick={() => toggleEdit(_package)}
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
                        // onClick={() => openDelete(_package)}
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

      {open && <PackageFormModal open={open} onClose={toggleModal} />}
    </Box>
  );
}

export default Package;
