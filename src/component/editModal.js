import React, { useEffect, useState } from "react";
import axios from "axios";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { Paper, Modal } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import "../css/modal.css";

function EditModal(props) {
  const [data, setData] = useState({});
  const [title, setTitle] = useState(data.title);
  const [subject, setSubject] = useState(data.subject);
  const [datetime, setDatetime] = useState(data.dateTime);
  const [description, setDescription] = useState(data.description);

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .post("/_api/getbyid", {
        id: props.id
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
    <div>
      <button type="button" onClick={handleOpen}>
        edit
      </button>
      {/* <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className="modal"
      > */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Paper className="papersize-modal">
          <div className="content-modal">
            <form onSubmit={handelSubmit}>
              <div className="head-part-modal">EDIT</div>
              <div className="form-modal">
                Title:
                <input
                  onChange={e => setTitle(e.target.value)}
                  placeholder={data.title}
                  value={title}
                ></input>
              </div>
              <div className="form-modal">
                Subject:
                <input
                  value={subject}
                  placeholder={data.subject}
                  onChange={e => setSubject(e.target.value)}
                ></input>
              </div>
              <div className="form-modal">
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
              <div className="form-modal">
                Description
                <input
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder={data.Description}
                ></input>
              </div>

              {/* <Link to="/golive"> */}
              <DialogActions>
                <button className="confirm" onClick={handleClose}>
                  OK!
                </button>
              </DialogActions>
              {/* </Link> */}
            </form>
          </div>
        </Paper>
      </Dialog>
      {/* </Modal> */}
    </div>
  );
}

export default EditModal;
