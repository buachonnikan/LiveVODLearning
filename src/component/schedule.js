import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import "../css/base.css";
import "../css/responsive.css";

function Schedule(props) {
  const classes = {
    bold: {
      fontWeight: "600"
    }
  };
  const [del, steDel] = useState("");

  return (
    <div>
      {props.res == "n" ? (
        <Paper className="softgreen schedule">
          <div className="container-video">
            <p id="today">Schedule</p>
            <div className="container-overflow-s">
              <div id="schedule">
                {props.live.map(l => (
                  <div>
                    <div alt="delete" onClick="">
                      delete
                    </div>
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
                        {new Date(l.dateTime).toLocaleString().split(", ")[0]}
                      </p>
                      <p>
                        <span style={classes.bold}>Time: </span>{" "}
                        {new Date(l.dateTime).toLocaleString().split(", ")[1]}
                      </p>
                      <p>
                        <span style={classes.bold}>Description: </span>
                        {l.description}
                      </p>
                      {props.t ? (
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
      ) : (
        <div className="container-video">
          <p id="today">Schedule</p>
          <div className="container-overflow-s">
            <div id="schedule">
              {props.live.map(l => (
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
                      {new Date(l.dateTime).toLocaleString().split(", ")[0]}
                    </p>
                    <p>
                      <span style={classes.bold}>Time: </span>{" "}
                      {new Date(l.dateTime).toLocaleString().split(", ")[1]}
                    </p>
                    <p>
                      <span style={classes.bold}>Description: </span>
                      {l.description}
                    </p>
                    {props.t ? (
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
      )}
    </div>
  );
}

export default Schedule;
