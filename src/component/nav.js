import React, { useState } from "react";
import "../css/nav.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles({
  list: {
    width: "20vw",
    position: "relative"
  },
  root: {
    display: "inline-block"
  },
  box: {
    diaplay: "fixed",
    height: "100vh"
  },
  menu: {
    width: "60px",
    paddingTop: "15px",
    cursor: "pointer",
    textAlign: "center",
    color: "#536400"
  }
});

function Navbar() {
  const classes = useStyles();
  const [state, setState] = useState({
    left: false
  });
  const [link, setLink] = useState([
    { name: "Live", path: "/live" },
    { name: "Course", path: "/course" }
  ]);
  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <div className="sud"></div>
      <List>
        {link.map(text => (
          <ListItem button key={text}>
            <Link to={text.path}>
              <ListItemText primary={text.name} />
            </Link>
          </ListItem>
        ))}
        {/* done live course - teacher subject none */}
        {["อาจารย์ผู้สอน", "รายวิชา"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <div onClick={toggleDrawer("left", true)} className={classes.menu}>
          <MenuIcon />
        </div>
      </div>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        {sideList("left")}
      </Drawer>
    </div>
  );
}

export default Navbar;
