import React, { useState } from "react";
import InpForm from "./inpForm";
import moment from "moment";
import EditContextProvider from "../context/EditContext";

const Form = () => {
  const [form, setForm] = useState([
    {
      title: "",
      subject: "",
      date: moment().format("MMM Do YYYY"),
      time: moment().format("hh:mm a"),
      description: "",
      id: 1
    }
  ]);

  const finishForm = (title, subject, datetime, description) => {
    setForm([
      {
        title: title,
        subject: subject,
        datetime: datetime,
        description: description,
        url: "",
        id: 2
      }
    ]);
  };

  return <InpForm finishForm={finishForm} />;
};

export default Form;
