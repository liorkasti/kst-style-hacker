import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";
import { SCREEN_NAMES, SERVICES } from "../constants/strings";
import { useStyles } from "../constants/styles";

type HeaderProps = {
  title: string;
  showBackButton?: boolean;
};

const Header: React.FC<HeaderProps> = ({ title, showBackButton = false }) => {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setDrawerOpen(open);
    };

  return (
    <div>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          {/* <Login /> */}
          {showBackButton && (
            <IconButton
              edge='start'
              color='inherit'
              aria-label='back'
              onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant='h6' className={classes.title}>
            {title}
          </Typography>
          <Typography
            variant='h1'
            className={`${classes.hackaStyle} font-effect-neon`}>
            {SERVICES.STYLE_HACKER_HEADER}
          </Typography>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer(true)}
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor='right'
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        classes={{ paper: classes.drawerPaper }}>
        <Box
          role='presentation'
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}>
          <List>
            <ListItem button onClick={() => navigate("/")}>
              <ListItemText
                primary={SCREEN_NAMES.HOME}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => navigate("/clothing-list?type=shoes")}>
              <ListItemText
                primary={SCREEN_NAMES.SHOES}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => navigate("/clothing-list?type=shirt")}>
              <ListItemText
                primary={SCREEN_NAMES.SHIRTS}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
            <ListItem
              button
              onClick={() => navigate("/clothing-list?type=pants")}>
              <ListItemText
                primary={SCREEN_NAMES.PANTS}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
            <Divider />
            <ListItem button onClick={() => navigate("/saved-sets")}>
              <ListItemText
                primary={SCREEN_NAMES.SAVED_SETS}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Header;
