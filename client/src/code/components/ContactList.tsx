// React imports.
import React from "react";

// Material-UI imports.
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Person from "@mui/icons-material/Person";
import { ListItemButton } from "@mui/material";
import Icon from '@mui/material/Icon';
import { green } from "@mui/material/colors";
import { sizeHeight, width } from "@mui/system";


/**
 * Contacts.
 */
const ContactList = ({ state }): JSX.Element => (

  <List>

    {state.contacts.map(value => {
      return (
        <ListItem>
          <ListItemButton key={ value } onClick={ () => 
            state.showContact(value._id, value.name, value.email, value.category) }>
            <ListItemAvatar>
              <Avatar>
                <Person sx={{ color: green[500] }}></Person>
              </Avatar>
            </ListItemAvatar>

            <ListItemText primary={ `[${value.category}]` } />
            <ListItemText secondary={ `${value.name}` } />

          </ListItemButton>
        </ListItem>
      );
    })}

  </List>

); /* End Contacts. */


export default ContactList;
