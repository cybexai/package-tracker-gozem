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

function CustomDeliveryAccordion({data}) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography fontWeight={600} fontSize={20}>
          Delivery Details
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Divider sx={{ mb: 3 }} />
        <Stack direction={"row"} justifyContent={"space-between"} mb={2}>
          <CustomKeyValue
            title={"Status:"}
            value={data?.status}
            rootStyle={{ width: "50%" }}
          />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}

CustomDeliveryAccordion.propTypes = {};

export default CustomDeliveryAccordion;
