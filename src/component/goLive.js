import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../css/base.css";
import "../css/golive.css";
import "../css/modal.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { LoggedContext } from "../context/LoggedContext";
import userr from "./checkType";
import { Paper } from "@material-ui/core";
import EditModal from "./editModal";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles({
  paper: {
    height: "65vh"
  },
  border: {
    border: "5px solid pink"
  }
});

const LoggedInHome = () => {
  const classes = useStyles();
  const [live, setLive] = useState([]);
  const [del, setDel] = useState("");
  const { isLogged, setLogged, user, setUser, sent } = useContext(
    LoggedContext
  );

  useEffect(() => {
    if (sent) {
      if (isLogged) {
        if (user.type !== "t") {
          window.location = "/401";
        }
      } else {
        window.location = "/401";
      }
    }

    userr
      .axiosAuthen()
      .get("/_api/getliveinstructor")
      .then(res => {
        setLive(res.data);
      })
      .catch(err => {});
  }, []);
  const deleteLive = e => {
    e.preventDefault();
    alert("คุณต้องการที่จะลบการถ่ายทอดสดนี้ใช่หรือไม่");
    axios
      .post("/_api/deletelive", {
        id: del
      })
      .then(res => {})
      .catch(function(err) {
        console.log(err);
      });
    userr
      .axiosAuthen()
      .get("/_api/getliveinstructor")
      .then(res => {
        setLive(res.data);
      })
      .catch(err => {});
  };

  const CssDialog = withStyles({
    paper: {
      borderRadius: "2rem"
    }
  })(Dialog);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const test = () => {
    console.log("yay");
  };

  return (
    <div>
      <div>
        <div>
          <div className="content">
            <div className="head-part">
              <Link to="/">
                <ArrowBackIosIcon id="arrow" />
              </Link>
              <h1 className="head">GO LIVE!</h1>
              <div className="none">
                <Link to="/form">
                  <button className="startlive">
                    START LIVE
                    <i class="fas fa-video"></i>
                  </button>
                </Link>
              </div>
            </div>

            <div className="golive">
              <div className="startbut">
                <Link to="/form">
                  <button className="sl">
                    <div className="startlive">
                      START
                      <br />
                      LIVE
                    </div>
                  </button>
                </Link>
              </div>
              <div className="r-notfull">
                <Paper className="softgreen schedule">
                  <div className="container-video">
                    <p id="today">Schedule</p>
                    <div className="container-overflow-s">
                      <div id="schedule">
                        {live.map(l => (
                          <div>
                            <form onSubmit={deleteLive}>
                              <button
                                alt="delete"
                                className="delete"
                                onClick={e => setDel(l._id)}
                              >
                                <i class="fas fa-times"></i>
                              </button>
                              {console.log("del" + del)}
                            </form>
                            <EditModal id={l._id} />
                            <div key={l._id} className="sub-schedule">
                              <div>
                                <span style={{ fontWeight: "600" }}>
                                  Title:{"  "}
                                </span>
                                {l.title}
                              </div>
                              <div>
                                <span style={{ fontWeight: "600" }}>
                                  Subject:{"  "}
                                </span>
                                {l.subject}
                              </div>
                              <div>
                                <span style={{ fontWeight: "600" }}>Date:</span>
                                {"  "}
                                {
                                  new Date(l.dateTime)
                                    .toLocaleString()
                                    .split(", ")[0]
                                }
                              </div>
                              <div>
                                <span style={{ fontWeight: "600" }}>Time:</span>
                                {"  "}
                                {
                                  new Date(l.dateTime)
                                    .toLocaleString()
                                    .split(", ")[1]
                                }
                              </div>
                              <div>
                                <span style={{ fontWeight: "600" }}>
                                  Description:{"  "}
                                </span>
                                {l.description}
                              </div>
                              <div id="myInput">Stream key: {l._id}</div>
                              {/* <hr /> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Paper>
              </div>
              <div className="r-full">
                <div className="container-video">
                  <p id="today">Schedule</p>
                  <div className="container-overflow-s">
                    <div id="schedule">
                      {live.map(l => (
                        <div>
                          <div key={l._id} className="sub-schedule">
                            <p>
                              <span style={classes.bold}>Title: </span>
                              {l.title}
                            </p>
                            <p>
                              <span style={classes.bold}>Subject: </span>
                              {l.subject}
                            </p>
                            <p>
                              <span style={classes.bold}>Date: </span>{" "}
                              {
                                new Date(l.dateTime)
                                  .toLocaleString()
                                  .split(", ")[0]
                              }
                            </p>
                            <p>
                              <span style={classes.bold}>Time: </span>{" "}
                              {
                                new Date(l.dateTime)
                                  .toLocaleString()
                                  .split(", ")[1]
                              }
                            </p>
                            <p>
                              <span style={classes.bold}>Description: </span>
                              {l.description}
                            </p>
                            {live.t ? (
                              <p id="myInput">Stream key: {l._id}</p>
                            ) : (
                              <p></p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoggedInHome;
