import { TextField, Button, Box, Alert } from "@mui/material";
import { useState } from "react";
import { storeToken } from "../services/LocalStorageService";
import { loginUser } from "../services/userapi";
import validator from "validator";

const UserLogin = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    if (actualData.email && actualData.password) {
      if (!validator.isEmail(actualData.email)) {
        setError({
          status: true,
          msg: "Please Enter a Valid Email",
          type: "error",
        });
      } else {
        if (actualData.password.length < 4) {
          setError({
            status: true,
            msg: "Password must be atleast 4 letter long",
            type: "error",
          });
        } else {
          const res = await loginUser(actualData);
          if (res.data.status === "success") {
            storeToken(res.data.token); //token LS me store kiya
            window.location.reload();
          }
          if (res.data.status === "failed") {
            setError({ status: true, msg: res.data.message, type: "error" });
          }
        }
      }
    } else {
      setError({ status: true, msg: "All Fields are Required", type: "error" });
    }
  };

  return (
    <>
      <Box
        component="form"
        sx={{ mt: 1 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          name="email"
          label="Email Address"
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
        />
        <Box textAlign="center">
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, px: 5 }}
          >
            Login
          </Button>
        </Box>
        {error.status ? (
          <Alert severity={error.type} sx={{ mt: 3 }}>
            {error.msg}
          </Alert>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default UserLogin;
