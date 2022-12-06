// React imports.
import React from "react";

// Material-UI imports.
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import { Block } from "@mui/icons-material";


/**
 * Mailboxes.
 */
const MailboxList = ({ state }): JSX.Element => (

  <List>

    { state.mailboxes.map(value => {
      return (
        <Chip label={ `${value.name}` } onClick={ () => state.setCurrentMailbox(value.path) }
          style={{ width:120, marginLeft:30, marginBottom:10, alignItems:"center" }}
          color={ state.currentMailbox === value.path ? "success" : "default" } />
      );
     } ) }

  </List>

); /* Mailboxes. */


export default MailboxList;
