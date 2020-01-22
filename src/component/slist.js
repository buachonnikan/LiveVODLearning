import React, { useEffect, useState } from "react";
import { BrowserRouter as route, Link } from "react-router-dom";
import List from "./list";
import "../css/base.css";
import axios from "axios";
import { ContactSupportOutlined } from "@material-ui/icons";

const TList = () => {
  const [subject, setSubject] = useState([]);
  useEffect(() => {
    axios
      .get("/_api/getsubjects")
      .then(res => {
        setSubject(res.data.subjects);
        console.log(res.data.subjects);
      })
      .catch(err => {});
  }, []);
  const name = subject.map(data => (
    <Link className="tname" to={"/subject/" + data}>
      <div className="teacher-course">
        <div id="tpic" className="set-center">
          {data[0]}
        </div>
        <div>{data}</div>
      </div>
    </Link>
  ));
  return <List list={name} head="รายชื่อวิชา" />;
};

export default TList;
