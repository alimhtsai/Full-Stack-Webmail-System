// React imports.
import React from "react";

// Material-UI imports.
import Button from "@mui/material/Button";
import NewContactIcon from "@mui/icons-material/ContactMail";
import NewMessageIcon from "@mui/icons-material/Email";



/**
 * Toolbar.
 */
const Toolbar = ({ state }): JSX.Element => (

  <div>
    <Button variant="contained" color="success" size="small" style={{ marginLeft:30, marginBottom:7, marginTop:7 }}
      onClick={ () => state.showComposeMessage("new") } >
      <NewMessageIcon style={{ marginRight:10 }} />New Message
    </Button>
    <Button variant="contained" color="inherit" size="small" style={{ marginLeft:30, marginBottom:7, marginTop:7 }}
      onClick={ state.showAddContact } >
      <NewContactIcon style={{ marginRight:10 }} />New Contact
    </Button>
  </div>

);


export default Toolbar;
