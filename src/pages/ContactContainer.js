import React, { useState, useEffect } from "react";
import {
  FormGroup,
  styled,
  Alert,
  Box,
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Input,
} from "@mui/material";
import Draggable from "react-draggable";
import { deleteContact, editContact } from "../services/contactapi";
import { getContact, getContactById } from "../services/contactapi";
import { getToken } from "../services/LocalStorageService";
import validator from "validator";

const Container = styled(FormGroup)`
      margin: 5px;
      flex-direction: row;
      & > div {
          margin-top: 20px;
  `;

const initialValue = {
  name: "",
  email: "",
  phone: "",
};

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}
const ContactContainer = () => {
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: "",
  });

  const [data, setData] = useState([]);

  const [contact, setContact] = useState(initialValue);

  const { name, email, phone } = contact;

  const onValueChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // for confirmation box
  const [opendelete, setOpendelete] = useState(false);

  const handleClickdeleteOpen = () => {
    setOpendelete(true);
  };

  const handleClosedelete = () => {
    setOpendelete(false);
  };

  const handleDelete = async (id) => {
    // confirmation box
    handleClosedelete();
    const res = await deleteContact(id, token);

    if (res.data.status === "success") {
      setError({ status: true, msg: res.data.message, type: "success" });
      loadDataDetails();
    } else {
      setError({ status: true, msg: res.data.message, type: "error" });
    }
  };

  // for confirmation box
  const [openedit, setOpenedit] = useState(false);

  const handleClickeditOpen = async (id) => {
    const res = await getContactById(id, token);
    if (res) {
      setContact({
        name: res.data.data.name,
        email: res.data.data.email,
        phone: res.data.data.phone,
      });
      setOpenedit(true);
    }
  };

  const handleCloseedit = () => {
    setContact(initialValue);
    setOpenedit(false);
  };

  const handleEdit = async (id) => {
    // confirmation box
    handleCloseedit();

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
    }
else{

  const res = await editContact(id, contact, token);
  
  if (res.data.status === "success") {
    setError({ status: true, msg: res.data.message, type: "success" });
    setContact(initialValue);
    loadDataDetails();
  } else {
    setError({ status: true, msg: res.data.message, type: "error" });
  }
}
  };

  useEffect(() => {
    loadDataDetails();
  }, []);

  const token = getToken();

  const loadDataDetails = async () => {
    const res = await getContact(token);

    res.data.status === "failed"
      ? setError({ status: true, msg: res.data.message, type: "error" })
      : setData(res.data.data);
  };

  return (
    <Box>


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
          <Container>

      {data.map((data) => (
        <Card key={data._id} sx={{ minWidth: 275, m: "10px" }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Name: {data.name}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Email: {data.email}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Phone: {data.phone}
            </Typography>

            {/* dialog box  */}
            <Dialog
              open={opendelete}
              onClose={handleClosedelete}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                Delete Contact
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClosedelete}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleDelete(data._id);
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>

            {/* dialog box  */}
            <Dialog
              open={openedit}
              onClose={handleCloseedit}
              PaperComponent={PaperComponent}
              aria-labelledby="draggable-dialog-title"
              scroll="paper"
            >
              <DialogTitle
                style={{ cursor: "move" }}
                id="draggable-dialog-title"
              >
                Edit Contact
              </DialogTitle>
              <DialogContent sx={{width:'400px'}}>
                <DialogContentText >
                  <FormControl fullWidth>
                    <InputLabel htmlFor="my-input">Name</InputLabel>
                    <Input
                      onChange={(e) => onValueChange(e)}
                      name="name"
                      value={name}
                      id="my-input"
                      required="true"
                    />
                  </FormControl>
                </DialogContentText>
                <DialogContentText>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="my-input">Email</InputLabel>
                    <Input
                      onChange={(e) => onValueChange(e)}
                      name="email"
                      value={email}
                      id="my-input"
                      required="true"
                    />
                  </FormControl>
                </DialogContentText>

                <DialogContentText>
                  <FormControl fullWidth>
                    <InputLabel htmlFor="my-input">Phone</InputLabel>
                    <Input
                      onChange={(e) => onValueChange(e)}
                      name="phone"
                      value={phone}
                      id="my-input"
                      required="true"
                    />
                  </FormControl>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleCloseedit}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleEdit(data._id);
                  }}
                >
                  Edit
                </Button>
              </DialogActions>
            </Dialog>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              onClick={() => {
                handleClickeditOpen(data._id);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              onClick={() => {
                handleClickdeleteOpen();
              }}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ))}

     
    </Container>
    </Box>

  );
};

export default ContactContainer;
