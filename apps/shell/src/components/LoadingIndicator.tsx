import React from "react";
import { CircularProgress, Box } from "@mui/material";

const LoadingIndicator: React.FC = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
      <CircularProgress />
    </Box>
  );
};

export default LoadingIndicator;
