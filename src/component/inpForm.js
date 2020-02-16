import React, { useState, useEffect, useContext } from "react";
import "../css/base.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, TextField, Grid } from "@material-ui/core";
import Navbar from "./nav";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { LoggedContext } from "../context/LoggedContext";
import axios from "axios";

const useStyles = makeStyles({
  arrow: {
    width: "40px",
    height: "auto",
    color: "black"
  },
  paper: {
    width: "500px",
    minHeight: "440px",
    height: "61vh",
    boxShadow: "none",
    backgroundColor: "#F2F3EE",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "50px",
    position: "relative"
  },
  paper2before: {
    width: "500px",
    height: "160px",
    borderStyle: "dashed",
    borderWidth: "5px",
    borderRadius: "2rem",
    borderColor: "#DDE0CE",
    boxShadow: "none",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "50px",
    position: "relative"
  },
  paper2after: {
    width: "500px",
    height: "200px",
    backgroundColor: "#F2F3EE",
    boxShadow: "none",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "50px"
  },
  border: {
    border: "2px solid pink"
  }
});

const InpForm = ({ finishForm, chooseFile }) => {
  const classes = useStyles();
  const [title, setTitle] = useState();
  const [subject, setSubject] = useState();
  const [dateTime, setdateTime] = useState();
  const [description, setDescription] = useState();
  const [edit, setEdit] = useState(false);
  const [url, setUrl] = useState();
  const { isLogged, user, sent } = useContext(LoggedContext);
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
  });
  const getCookie = cname => {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  };

  var axiosAuthen = axios.create({
    headers: { Authorization: "Bearer " + getCookie("cookie") }
  });

  var axiosUpload = axios.create({
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + getCookie("cookie")
    }
  });
  const handelSubmit = e => {
    e.preventDefault();
    finishForm(title, subject, dateTime, description, url);
    setTitle("");
    setSubject("");
    setdateTime();
    setDescription("");
    setUrl("");
    axiosAuthen
      .post("/_api/addlive", {
        title: title,
        instructor: "live",
        subject: subject,
        dateTime: dateTime,
        description: description
      })
      .then(res => {
        setTitle(res.data.title);
        setSubject(res.data.subject);
        setdateTime(new Date(res.data.dateTime).toLocaleString());
        setDescription(res.data.description);
        setUrl(res.data._id);
        setEdit(true);
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  const handleFile = e => {
    e.preventDefault();
    let file = e.target.files[0];
    const datas = new FormData();
    datas.append("file", file);
    datas.append("id", url);
    axiosUpload
      .post("/_api/upload", datas)
      .then(res => {})
      .catch(function(err) {
        console.log(err);
      });
  };
  const check = e => {
    e.preventDefault();
    setEdit(false);
  };
  return (
    <div>
      <Grid container>
        <Grid item xs={11}>
          <div className="content">
            <div>
              <Link to="/goLive">
                <ArrowBackIosIcon className={classes.arrow} />
              </Link>
              <h1 className="head">START LIVE</h1>
            </div>
            <div classNamme="inner-content">
              <Grid container spacing={6}>
                <Grid item xs={6} className="inner-content">
                  {edit ? (
                    <img
                      src="https://uppic.cc/d/5DzR"
                      className="step"
                      width="100"
                      height="100"
                      alt="stepone"
                    />
                  ) : (
                    <img
                      src="https://uppic.cc/d/5Dqu"
                      className="step"
                      width="100"
                      height="100"
                      alt="steponeafter"
                    />
                  )}
                  <Paper className={classes.paper}>
                    <div className="containerForm">
                      {edit ? (
                        <div>
                          <div className="subform" id="form-title">
                            <p className="textForm">Title:</p>
                            <p className="yay">{title}</p>
                          </div>
                          <div className="subform" id="form-subject">
                            <p className="textForm">Subject:</p>
                            <p className="yay">{subject}</p>
                          </div>
                          <div className="subform" id="form-date">
                            <p className="textForm">Date:</p>
                            <p className="yay" id="dateTime">
                              {dateTime}
                            </p>
                          </div>
                          <div className="subform">
                            <p className="textForm">Description:</p>
                            <p>{description}</p>
                          </div>
                          <div className="containbut">
                            <div className="form-button edit" onClick={check}>
                              EDIT
                            </div>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handelSubmit}>
                          <div className="subform" id="form-title">
                            <p className="textForm">Title:</p>
                            <input
                              type="text"
                              id="title"
                              name="title"
                              value={title}
                              placeholder="Your video title"
                              className="form-inp"
                              onChange={e => setTitle(e.target.value)}
                            />
                          </div>
                          <div className="subform" id="form-subject">
                            <p className="textForm">Subject:</p>
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={subject}
                              placeholder="Your video subject"
                              className="form-inp"
                              onChange={e => setSubject(e.target.value)}
                            />
                          </div>
                          <div className="subform" id="form-date">
                            <p className="textForm">Date:</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DateTimePicker
                                value={dateTime}
                                onChange={setdateTime}
                                className="dateTime"
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                          <div className="subform">
                            <p className="textForm">Description</p>
                            <TextField
                              id="outlined-multiline-static"
                              multiline
                              rows="3"
                              name="description"
                              value={description}
                              defaultValue="Default Value"
                              className={classes.textField}
                              variant="outlined"
                              onChange={e => setDescription(e.target.value)}
                            />
                          </div>
                          <div className="containbut">
                            <button type="submit" className="form-button">
                              NEXT STEP>>
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  {edit ? (
                    <img
                      src="https://uppic.cc/d/5Dzs"
                      className="step"
                      width="100"
                      height="100"
                      alt=""
                      steptwo
                    />
                  ) : (
                    <img
                      src="https://uppic.cc/d/5DzR"
                      className="step"
                      width="100"
                      height="100"
                      alt="stepteoafter"
                    />
                  )}
                  {edit ? (
                    <Paper className={classes.paper2after}>
                      <div className="containerForm2a">
                        <div className="getlink">GET LINK</div>
                        <div className="link">
                          <p className="l">Stream key: {url}</p>
                        </div>
                        <form>
                          <input type="file" onChange={handleFile} />
                        </form>
                        {/* <form className="fileContainer">
                          <label className="fileLabel">
                            UPLOAD FILE
                            <input
                              type="file"
                              onChange={handleFile}
                              id="file"
                            />}
                          </label>
                        </form> */}
                      </div>
                    </Paper>
                  ) : (
                    <Paper className={classes.paper2before}>
                      <div className="containerForm2b">
                        {/* Stream key: {url} */}
                      </div>
                      {/* <form>
                        <input type="file" onChange={handleFile} />
                      </form> */}
                    </Paper>
                  )}
                </Grid>
              </Grid>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default InpForm;
