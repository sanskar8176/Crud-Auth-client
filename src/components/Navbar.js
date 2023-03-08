import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import { getToken, removeToken } from "../services/LocalStorageService";
import React from "react";

const Navbar = () => {
  const token = getToken();

  // console.log(token, "nav me ", user);

  const handleLogout = () => {
    removeToken("token");

    window.location.reload();
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Welcome to my website
            </Typography>

            {token && (
              <Button
                onClick={() => handleLogout()}
                sx={{ color: "white", textTransform: "none" }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
