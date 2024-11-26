import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Box, styled } from "@mui/system";

export default function AccordionUsage({ contentList, onEdit, onDelete }) {
  return (
    <MainStyle>
      {contentList.map((content, index) => (
        <Accordion key={index} sx={{ marginBottom: "10px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
            className="content"
          >
            <strong>{content.name}</strong>
          </AccordionSummary>
          <AccordionDetails className="container1">
          <div>
              <strong>Name: </strong>{content.name} &nbsp;&nbsp;
           
              <strong>Number: </strong>{content.number}
            </div>
            <div className="icon-container">
              <DriveFileRenameOutlineIcon
                className="edit-icon"
                onClick={() => onEdit(index)} 
              />
              <DeleteForeverIcon
                className="delete-icon"
                onClick={() => onDelete(index)} 
              />
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </MainStyle>
  );
}

const MainStyle = styled(Box)({
  "& .content": {
    fontSize: "18px",
    fontWeight: "600",
    color: "#2c3e50",
  },
  "& .container1": {
    fontSize: "16px",
    fontWeight: "400",
    justifyContent: "space-between",
    display: "flex",
    alignItems: "center", 
  },
  "& .icon-container": {
    display: "flex",
    gap: "15px", 
    alignItems: "center", 
  },
  "& .edit-icon": {
    color: "#007bff", 
    cursor: "pointer",
    "&:hover": {
      color: "#0056b3",
    },
  },
  "& .delete-icon": {
    color: "#d32f2f",
    cursor: "pointer",
    "&:hover": {
      color: "#c62828",
    },
  },
});
