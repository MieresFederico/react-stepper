import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <Typography variant="h6">Multi-Step Form</Typography>
      </Toolbar>
    </AppBar>
  );
};
