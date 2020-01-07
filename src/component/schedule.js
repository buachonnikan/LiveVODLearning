import React from "react";
import { Paper } from "@material-ui/core";

function Schedule(props) {
  //   const classes = useStyles();
  const classes = {
    bold: {
      fontWeight: "600"
    }
  };
  // const date = props.live.map(l=>(

  // ))
  return (
    <Paper className="schedule">
      <div className="container-video">
        <p id="today">Schedule</p>
        <div className="container-overflow-s">
          <div>
            {props.live.map(l => (
              <div>
                {/* <div>
                  {new Date(l.dateTime).toLocaleString().split(", ")[0]}
                </div> */}
                <div key={l._id} className="sub-schedule" id="schedule">
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
                  {props.t ? <p id="myInput">Stream key: {l._id}</p> : <p></p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default Schedule;
