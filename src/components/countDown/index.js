import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const CountDown = (props) => {
  const circularProgress = 100 - (props.progress * 100) / props.max;
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={circularProgress}
        thickness={4}
        size={80}
        {...props}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6" component="div" color="text.primary">
          {`${Math.floor((props.max - props.progress) / 60)}m ${
            (props.max - props.progress) % 60
          }s`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CountDown;
