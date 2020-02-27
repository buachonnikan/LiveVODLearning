import React, { useState, useEffect, useContext } from "react";
import "../css/base.css";
import "../css/form.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { BrowserRouter as Route, Link } from "react-router-dom";
import { Paper, TextField, Grid } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { LoggedContext } from "../context/LoggedContext";
import axios from "axios";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { createMuiTheme } from "@material-ui/core";
import { lightGreen900 } from "material-ui/styles/colors";
import two from "./icon/two.png";
import twobefore from "./icon/twobefore.png";
import one from "./icon/one.png";
import done from "./icon/correct.png";

const outerTheme = createMuiTheme({
  palette: {
    primary: {
      main: lightGreen900
    }
  }
});

const InpForm = ({ finishForm, chooseFile }) => {
  const [title, setTitle] = useState();
  const [subject, setSubject] = useState();
  const [dateTime, setdateTime] = useState();
  const [description, setDescription] = useState();
  const [edit, setEdit] = useState(false);
  const [url, setUrl] = useState();
  const { isLogged, user, sent } = useContext(LoggedContext);
  const muiTheme = getMuiTheme({
    dateTimePicker: {
      selectColor: lightGreen900
    }
  });
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
      <div>
        <div>
          <div className="content-form">
            <div className="head-part-form">
              <Link to="/goLive">
                <ArrowBackIosIcon id="arrow" />
              </Link>
              <h1 className="head">START LIVE</h1>
            </div>
            <div className="nor">
              <div classNamme="inner-content">
                <div className="add-live-part">
                  <div className="firststep">
                    {edit ? (
                      <img src={done} className="step" />
                    ) : (
                      <img
                        src={one}
                        className="step"
                        style={{ color: "#ffce00" }}
                      />
                    )}
                    <Paper className="firststep-paper softgreen">
                      {/*หลังnextstep */}
                      <div className="form-container">
                        {edit ? (
                          <div>
                            <div className="subform">
                              <p className="textForm">Title:</p>
                              <p className="yay">{title}</p>
                            </div>
                            <div className="subform">
                              <p className="textForm">Subject:</p>
                              <p className="yay">{subject}</p>
                            </div>
                            <div className="subform">
                              <p className="textForm">Date:</p>
                              <p className="yay" id="dateTime">
                                {dateTime}
                              </p>
                            </div>
                            <div className="subform">
                              <p className="textForm">Description:</p>
                              <p>{description}</p>
                            </div>
                          </div>
                        ) : (
                          /*ก่อนnextstep */
                          <form onSubmit={handelSubmit}>
                            <div className="subform">
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
                            <div className="subform">
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
                            <div className="subform">
                              <p className="textForm">Date:</p>
                              <MuiPickersUtilsProvider
                                utils={DateFnsUtils}
                                theme={outerTheme}
                              >
                                <DateTimePicker
                                  value={dateTime}
                                  onChange={setdateTime}
                                  className="dateTime"
                                />
                              </MuiPickersUtilsProvider>
                            </div>
                            <div>
                              <p className="textForm">Description</p>
                              <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows="3"
                                name="description"
                                value={description}
                                defaultValue="Default Value"
                                className="des"
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
                  </div>
                  <div>
                    {edit ? (
                      <img
                        src={two}
                        className="step"
                        width="100"
                        height="100"
                        alt=""
                        steptwo
                      />
                    ) : (
                      <img
                        src={twobefore}
                        className="step"
                        width="100"
                        height="100"
                        alt="stepteoafter"
                      />
                    )}
                    {edit ? (
                      <div className="set-center-col">
                        <Paper className="secondstep-paper-active softgreen">
                          <div className="url-container">
                            <div className="getlink">GET KEY</div>
                            <p className="url">{url}</p>
                            <form>
                              <input type="file" onChange={handleFile} />
                            </form>
                          </div>
                        </Paper>
                        <div className="try set-center">
                          <Link to="/golive" className="finish-but">
                            <div>FINISH</div>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div className="secondstep">
                        <Paper className="secondstep-paper"></Paper>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="r-gl">
              {edit ? (
                <div>
                  <div className="steps">
                    <div className="stepline">
                      <img src={one} className="step-r one" />
                      <p> -------- </p>
                      <img src={twobefore} className="step-r one" />
                    </div>
                  </div>
                  {/* second step */}
                  <div className="set-center">
                    <Paper className="firststep-paper set-center-col">
                      <div>
                        <div className="subform">
                          <p className="textForm">Title:</p>
                          <p className="yay">{title}</p>
                        </div>
                        <div className="subform">
                          <p className="textForm">Subject:</p>
                          <p className="yay">{subject}</p>
                        </div>
                        <div className="subform">
                          <p className="textForm">Date:</p>
                          <p className="yay">{dateTime}</p>
                        </div>
                        <div className="subform">
                          <p className="textForm">Description:</p>
                          <p>{description}</p>
                        </div>
                        <div className="getlink-container">
                          <div>
                            <div className="getlink">GET KEY</div>
                            <div className="">{url}</div>
                          </div>
                        </div>
                        <form>
                          <input type="file" onChange={handleFile} />
                        </form>
                      </div>
                      <Link to="/goLive">
                        <div className="finish">FINISH</div>
                      </Link>
                    </Paper>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="steps">
                    <div className="stepline">
                      <img src={done} className="step-r two" />
                      <p> -------- </p>
                      <img src={two} className="step-r two" />
                    </div>
                  </div>
                  <div>
                    {/*first step*/}
                    <div className="set-center">
                      <Paper className="firststep-paper">
                        <form onSubmit={handelSubmit}>
                          <div className="subform">
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
                          <div className="subform">
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
                          <div className="subform">
                            <p className="textForm">Date:</p>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <DateTimePicker
                                value={dateTime}
                                onChange={setdateTime}
                                className="dateTime"
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                          <div>
                            <p className="textForm">Description</p>
                            <TextField
                              id="outlined-multiline-static"
                              multiline
                              rows="3"
                              name="description"
                              value={description}
                              defaultValue="Default Value"
                              className="des"
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
                      </Paper>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InpForm;
