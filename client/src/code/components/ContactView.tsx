// React imports.
import React from "react";

// Material-UI imports.
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";


/**
 * ContactView.
 */
const ContactView = ({ state }): JSX.Element => (

  <form>

    <TextField margin="dense" id="contactName" label="Name" value={ state.contactName } variant="outlined"
      InputProps={{ style : { color : "#000000" } }} disabled={ false } style={{ width:260, margin:10 }}
      onChange={ state.fieldChangeHandler } />
    <br />
    <TextField margin="dense" id="contactEmail" label="Email" value={ state.contactEmail } variant="outlined"
      InputProps={{ style : { color:"#000000" } }} disabled={ false } style={{ width:520, margin:10  }}
      onChange={ state.fieldChangeHandler } />
    <br />
    <TextField margin="dense" id="contactCategory" label="Category" value={ state.contactCategory } variant="outlined"
      InputProps={{ style : { color:"#000000" } }} disabled={ false } style={{ width:260, margin:10  }}
      onChange={ state.fieldChangeHandler } />
    <br />
    
    { /* Hide.show buttons as appropriate.  Note that we have to use this form of onClick() otherwise the event  */ }
    { /* object would be passed to addContact() and the branching logic would fail. */ }
    { state.currentView === "contactAdd" &&
      <Button variant="contained" color="success" size="small" style={{ marginLeft:15, marginRight:5, marginTop:5 ,marginBottom:10 }}
        onClick={ state.saveContact }>
        Save
      </Button>
    }
    { state.currentView === "contact" &&
      <Button variant="contained" color="warning" size="small" style={{ marginLeft:15, marginRight:5, marginTop:5 ,marginBottom:10 }}
        onClick={ state.deleteContact }>
        Delete
      </Button>
    }
    { state.currentView === "contact" &&
      <Button variant="contained" color="success" size="small" style={{ marginLeft:15, marginRight:5, marginTop:5 ,marginBottom:10 }}
      onClick={ () => state.showComposeMessage("contact") }>
        Send Email
      </Button>
    }
    { state.currentView === "contact" &&
      <Button variant="contained" color="inherit" size="small" style={{ marginLeft:15, marginRight:5, marginTop:5 ,marginBottom:10 }}
        onClick={ state.updateContact }>
        Update
      </Button>
    }

  </form>

); /* ContactView. */


export default ContactView;
