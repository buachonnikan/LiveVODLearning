import React from "react";
import { Paper } from "@material-ui/core";

function Schedule(props) {
  //   const classes = useStyles();
  const classes = {
    paper: {
      height: "65vh"
    },
    containerVideo: {
      padding: "20px",
      position: "relative"
    },
    containerOverflow: {
      overflow: "auto",
      width: "auto",
      height: "60vh"
    },
    bold: {
      fontWeight: "600"
    }
  };

  return (
    <Paper style={classes.paper}>
      <div className="container-video">
        <div className="container-overflow">
          <div className="schedule">
            {props.live.map(l => (
              <div key={l._id}>
                <p>
                  <span style={classes.bold}>Title: </span>
                  {l.title}
                </p>
                <p>
                  <span style={classes.bold}>Subject: </span>
                  {l.subject}
                </p>
                <p>
                  <span style={classes.bold}>Date-Time: </span> {l.dateTime}
                </p>
                <p>
                  <span style={classes.bold}>Description: </span>
                  {l.description}
                </p>
                {props.t ? <p id="myInput">Stream key: {l._id}</p> : <p></p>}
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default Schedule;
