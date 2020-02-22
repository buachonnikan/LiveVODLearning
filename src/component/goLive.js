import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../css/base.css";
import "../css/golive.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { LoggedContext } from "../context/LoggedContext";
import userr from "./checkType";
import { Paper } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import EditModal from "./editModal";

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

  return (
    <div>
      <div>
        <div>
          <div className="content">
            <div className="head-part">
              <Link to="/home">
                <ArrowBackIosIcon id="arrow" />
              </Link>
              <h1 className="head">GO LIVE!</h1>
              <div className="r">
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
                  <button className="startlive">
                    START
                    <br />
                    LIVE
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
                                value={l._id}
                                onClick={e => setDel(e.target.value)}
                              >
                                {console.log(del)}
                                delete
                              </button>
                            </form>
                            {/* <Link to={"/edit/" + l._id}>edit</Link> */}
                            <EditModal id={l._id} />
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
