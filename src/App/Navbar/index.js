import { AppBar, Toolbar, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { MenuIcon } from "@material-ui/icons/Menu";

import styled from "styled-components"


const state = {
  auth: true,
  anchorEl: null,
  anchorOriginVertical: 'bottom',
  anchorOriginHorizontal: 'right',
  transformOriginVertical: 'top',
  transformOriginHorizontal: 'right',
};


const handleMenu = (event) => {
  this.setState({ anchorEl: event.currentTarget });
};

const handleClose = () => {
  this.setState({ anchorEl: null });
};


function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit">
          <MenuIcon />
        </IconButton>
        <div>
          <IconButton
            onCLick={handleMenu}
            >
            <AccountCircle />
          </IconButton>
          <Menu 
            id="menu-appbar"
            anchorEl={state.anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>

      </Toolbar>
    </AppBar>
  );
}

export default Navbar