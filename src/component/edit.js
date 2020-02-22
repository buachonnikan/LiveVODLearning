import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
// import EditForm from "./edit-form";

function Edit(props) {
  const { match } = props;
  const [data, setData] = useState({});
  const [title, setTitle] = useState(data.title);
  const [subject, setSubject] = useState(data.subject);
  const [datetime, setDatetime] = useState(data.dateTime);
  const [description, setDescription] = useState(data.description);

  let { streamkey } = match.params;
  useEffect(() => {
    axios
      .post("/_api/getbyid", {
        id: streamkey
      })
      .then(res => {
        setData(res.data);
      })
      .catch(function(err) {});
  });

  const handelSubmit = e => {
    e.preventDefault();
    console.log(title);
    setTitle("");
    setSubject("");
    setDatetime();
    setDescription("");
    axios
      .put("/_api/editlive", {
        title: title,
        subject: subject,
        dateTime: datetime,
        description: description,
        id: streamkey
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
            placeholder={data.title}
            value={title}
          ></input>
        </div>
        <div>
          Subject:
          <input
            value={subject}
            placeholder={data.subject}
            onChange={e => setSubject(e.target.value)}
          ></input>
        </div>
        <div>
          date:
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              value={datetime}
              className="dateTime"
              onChange={setDatetime}
              disablePast={true}
              initialFocusedDate={data.dateTime}
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          Description
          <input
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder={data.Description}
          ></input>
        </div>
      </div>
      {/* <Link to="/golive"> */}
      <button>Confirm Edit</button>
      {/* </Link> */}
    </form>
  );
}

export default Edit;
