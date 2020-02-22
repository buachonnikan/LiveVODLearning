import React, { useState, useEffect } from "react";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "../css/base.css";
import axios from "axios";
import moment from "moment";
import { BrowserRouter as Route, Link } from "react-router-dom";

function EditForm(props) {
  let t = props.data.title;
  const [title, setTitle] = useState(props.data.title);
  const [subject, setSubject] = useState(props.data.subject);
  const [datetime, setDatetime] = useState(props.data.dateTime);
  const [description, setDescription] = useState(props.data.description);
  //   const [form, setForm] = useState([
  //     {
  //       title: "",
  //       subject: "",
  //       date: moment().format("MMM Do YYYY"),
  //       time: moment().format("hh:mm a"),
  //       description: ""
  //     }
  //   ]);

  //   const finishForm = (title, subject, datetime, description) => {
  //     setForm([
  //       {
  //         title: title,
  //         subject: subject,
  //         datetime: datetime,
  //         description: description
  //       }
  //     ]);
  //   };

  const handelSubmit = e => {
    e.preventDefault();
    // finishForm(title, subject, datetime, description);
    setTitle("");
    setSubject("");
    setDatetime();
    setDescription("");
    axios
      .put("/_api/editlive", {
        title: title,
        subject: subject,
        dateTime: props.data.dateTime,
        description: description,
        id: props.id
      })
      .then(res => {
        // console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  };
  return (
    <form onSubmit={handelSubmit}>
      <div className="content">
        <div className="head-part">
          <div className="head">Edit</div>
        </div>
        <div>
          Title:
          <input
            onChange={e => setTitle(e.target.value)}
            placeholder={props.data.title}
            value={title}
          ></input>
        </div>
        <div>
          Subject:
          <input
            value={subject}
            placeholder={props.data.subject}
            onChange={e => setSubject(e.target.value)}
          ></input>
        </div>
        <div>
          date:
          {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              value={datetime}
              className="dateTime"
              onChange={e => setDatetime(e.target.value)}
            />
          </MuiPickersUtilsProvider> */}
        </div>
        <div>
          Description
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={props.data.Description}
          ></input>
        </div>
      </div>
      {/* <Link to="/golive"> */}
      <button type="submit">Confirm Edit</button>
      {/* </Link> */}
    </form>
  );
}
export default EditForm;
