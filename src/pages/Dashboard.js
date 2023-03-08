import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  styled,
  Typography,
  Alert,
} from "@mui/material";
import { getToken } from "../services/LocalStorageService";
import { useState } from "react";
import { addContact } from "../services/contactapi";
import ContactContainer from "./ContactContainer";
import validator from "validator";

const initialValue = {
  name: "",
  email: "",
  phone: "",
};

const Container = styled(FormGroup)`
    width: 50%;
    margin: 5% 0 0 25%;
    & > div {
        margin-top: 20px;
`;

const Dashboard = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const [data, setData] = useState(initialValue);
  const { name, email, phone } = data;

  const token = getToken();

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();

    // logical check here

    if (!name || !email || !phone) {
      setError({ status: true, msg: "All fields required", type: "error" });
    } else if (!validator.isEmail(email)) {
      setError({ status: true, msg: "Email is not Valid", type: "error" });
    } else if (!validator.isMobilePhone(phone)) {
      setError({ status: true, msg: "phone is not valid", type: "error" });
    } else if (name.length < 3) {
      setError({
        status: true,
        msg: "Name should be atleast 3 length long",
        type: "error",
      });
    } else {
      const res = await addContact(data, token);

      if (res.data.status === "success") {
        setError({ status: true, msg: res.data.message, type: "success" });

        // setTimeout(() => {
        //   navigate("/user");
        // }, 500);

        setData(initialValue);
        window.location.reload();
      } else {
        setError({ status: true, msg: res.data.message, type: "error" });
      }
    }
  };

  return (
    <>
      <Container>
        <Typography variant="h4" textAlign="center">
          Add Contact
        </Typography>
        <FormControl>
          <InputLabel htmlFor="my-input">Name</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="name"
            value={name}
            id="my-input"
            required="true"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Email</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="email"
            value={email}
            id="my-input"
            required="true"
          />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor="my-input">Phone</InputLabel>
          <Input
            onChange={(e) => onValueChange(e)}
            name="phone"
            value={phone}
            id="my-input"
            required="true"
          />
        </FormControl>

        <FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit()}
          >
            Add Contact
          </Button>
        </FormControl>

        {error.status && (
          <Alert
            onClose={() => {
              setError({ status: false });
            }}
            severity={error.type}
            sx={{ mt: 3 }}
          >
            {error.msg}
          </Alert>
        )}

        <ContactContainer />
      </Container>
    </>
  );
};

export default Dashboard;
