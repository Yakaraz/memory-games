import React from "react";
import { Box, Typography } from "@mui/material";

const Description = () => (
  <Box sx={{ marginBottom: "1em" }}>
    <Typography
      component="h3"
      color="primary"
      fontFamily="Inter"
      fontStyle="normal"
      fontSize="24px"
      fontWeight="500"
      lineHeight="29px"
      mt="2em"
      mb="0.5em"
    >
      <Typography
        component="div"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="24px"
        fontWeight="700"
        lineHeight="36px"
        textAlign="center"
        mr="1em"
        sx={{
          display: "inline-block",
          borderRadius: "50%",
          height: "36px",
          width: "36px",
          color: "white",
          backgroundColor: "#003986",
        }}
      >
        2
      </Typography>
      Choisissez le nombre de photos à reconnaître.
    </Typography>
    <Typography
      component="span"
      color="secondary"
      fontFamily="Inter"
      fontStyle="normal"
      fontSize="16px"
      fontWeight="400"
      lineHeight="26px"
    >
      <Typography
        component="span"
        fontFamily="Inter"
        fontStyle="normal"
        fontSize="16px"
        fontWeight="700"
        lineHeight="26px"
        sx={{ margin: "0.5ch" }}
      >
        Par défaut, nous choisirons le nombre maximal d’images.
      </Typography>
    </Typography>
  </Box>
);

export default Description;
