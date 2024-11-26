import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Box, Modal, Typography, styled, TextField } from "@mui/material";
import AccordionUsage from "./accordion";

const ContentForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [error, setError] = useState({ name: "", number: "" });
  const [contentList, setContentList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError({ name: "", number: "" });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (e.target.value.trim() === "") {
      setError((prevError) => ({ ...prevError, name: "Name is required" }));
    } else {
      setError((prevError) => ({ ...prevError, name: "" }));
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    if (value.length !== 10) {
      setError((prevError) => ({
        ...prevError,
        number: "Number must be 10 digits",
      }));
    } else {
      setError((prevError) => ({ ...prevError, number: "" }));
    }
  };

  const handleSave = () => {
    if (editIndex !== null) {
      const updatedContent = [...contentList];
      updatedContent[editIndex] = { name, number };
      setContentList(updatedContent);
    } else {
      setContentList([...contentList, { name, number }]);
    }
    setName("");
    setNumber("");
    setEditIndex(null);
    handleClose();
  };

  const handleEdit = (index) => {
    const contentToEdit = contentList[index];
    setName(contentToEdit.name);
    setNumber(contentToEdit.number);
    setEditIndex(index);
    handleOpen();
  };

  const handleDelete = (index) => {
    const updatedContent = contentList.filter((_, i) => i !== index);
    setContentList(updatedContent);
  };

  const isButtonDisabled =
    name.trim() === "" || number.length !== 10;

  return (
    <>
      <MainStyle>
        <Button variant="contained" className="container" onClick={handleOpen}>
          Add Contact
        </Button>
        <AccordionUsage
          contentList={contentList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </MainStyle>

      <Modal open={open}>
        <ModalContent>
          <Typography variant="h6" component="h2" sx={{ fontWeight: "bold", color: "#1976D2" }}>
            Add Contact
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <TextField
              id="name"
              label="Name"
              variant="outlined"
              value={name}
              onChange={handleNameChange}
              error={Boolean(error.name)}
              helperText={error.name}
              placeholder="Enter name"
              fullWidth
              sx={{ mb: 2 }}
            />
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            <TextField
              id="number"
              label="Number"
              type="number"
              variant="outlined"
              value={number}
              onChange={handleNumberChange}
              error={Boolean(error.number)}
              helperText={error.number}
              placeholder="Enter number"
              fullWidth
            />
          </Typography>
          <div className="btn-contain">
            <Button
              variant="outlined"
              onClick={handleSave}
              sx={{ mt: 2 }}
              className="save-btn"
              disabled={isButtonDisabled}
            >
              Save
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ mt: 2 }}
              className="cancel-btn"
            >
              Cancel
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

const MainStyle = styled(Box)({
  backgroundColor: "#e3f2fd",
  margin: "20px",
  textAlign: "center",
  justifyContent: "center",
  alignItems: "center",
  padding: "50px",
  borderRadius: "15px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  "& .container": {
    backgroundColor: "#1e88e5", 
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    margin: "20px",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#1565c0", 
    },
  },
});

const ModalContent = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "15px",
  boxShadow: 24,
  minWidth: "250px",
  textAlign: "center",
  "& .btn-contain": {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
    gap: "10px",
  },
  "& .save-btn": {
    color: "#388e3c", 
    border: "2px solid #388e3c",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#e8f5e9", 
      borderColor: "#2c6e33",
    },
    "&:disabled": {
      color: "#bdbdbd", 
      border: "2px solid #bdbdbd", 
      cursor: "not-allowed", 
      "&:hover": {
        backgroundColor: "transparent", 
        borderColor: "#bdbdbd", 
      },
    },
  },
  "& .cancel-btn": {
    color: "#d32f2f", 
    border: "2px solid #d32f2f", 
    textTransform: "none",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "10px",
    "&:hover": {
      backgroundColor: "#ffebee",
      borderColor: "#c62828",
    },
    "&:disabled": {
      color: "#bdbdbd",
      border: "2px solid #bdbdbd", 
      cursor: "not-allowed", 
      "&:hover": {
        backgroundColor: "transparent",
        borderColor: "#bdbdbd",
      },
    },
  },
});

export default ContentForm;
