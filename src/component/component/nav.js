import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, MenuItem } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "../css/nav.css";

const useStyles = makeStyles({
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  }
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  let [, setState2] = React.useState();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };
  return (
    <div>
      <button onClick={toggleDrawer("left", true)} id="menu-but">
        <i class="fas fa-bars"></i>
      </button>
      <Drawer open={state.left} onClose={toggleDrawer("left", false)}>
        <div
          className={classes.list}
          onClick={toggleDrawer("left", false)}
          onKeyDown={toggleDrawer("left", false)}
          id="drawer"
        >
          <div>
            {[
              { title: "HOME", path: "/" },
              { title: "LIVE", path: "/live" },
              { title: "COURSE", path: "/course" },
              { title: "รายชื่ออาจารย์", path: "/teacher-list" },
              { title: "รายชื่อรายวิชา", path: "/subject-list" }
            ].map(data => (
              <div className="eachmenu">
                {data.title == "COURSE" ? (
                  <ListItem button key={data.title}>
                    <Link to={{ pathname: "/course", state: { detail: null } }}>
                      {data.title}
                    </Link>
                  </ListItem>
                ) : (
                  <ListItem button key={data.title}>
                    <Link to={data.path}>{data.title}</Link>
                  </ListItem>
                )}
              </div>
            ))}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
