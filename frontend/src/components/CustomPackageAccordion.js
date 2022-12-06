import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CustomKeyValue from "./CustomKeyValue";

function CustomPackageAccordion({data}) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography fontWeight={600} fontSize={20}>
          Package Details
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Divider sx={{ mb: 3 }} />
        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
          <CustomKeyValue
            title={"Description:"}
            value={data.description}
            rootStyle={{ width: "50%" }}
          />
          <CustomKeyValue
            title={"Weight:"}
            value={data.weight}
            rootStyle={{ width: "50%" }}
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
          <CustomKeyValue
            title={"Width:"}
            value={data.width}
            rootStyle={{ width: "50%" }}
          />
          <CustomKeyValue
            title={"Height:"}
            value={data.height}
            rootStyle={{ width: "50%" }}
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
          <CustomKeyValue
            title={"Depth:"}
            value={data.depth}
            rootStyle={{ width: "50%" }}
          />
          <CustomKeyValue
            title={"Sender name:"}
            value={data.from_name}
            rootStyle={{ width: "50%" }}
          />
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
          <CustomKeyValue
            title={"Sender address:"}
            value={data.from_address}
            rootStyle={{ width: "50%" }}
          />
          <CustomKeyValue
            title={"Receiver name:"}
            value={data.to_name}
            rootStyle={{ width: "50%" }}
          />
        </Stack>
        <CustomKeyValue
          title={"Receiver address:"}
          value={data.to_address}
          rootStyle={{ width: "50%" }}
        />
      </AccordionDetails>
    </Accordion>
  );
}

CustomPackageAccordion.propTypes = {};

export default CustomPackageAccordion;
