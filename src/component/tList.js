import React, { useEffect, useState } from "react";
import { BrowserRouter as route, Link } from "react-router-dom";
import List from "./list";
import "../css/base.css";
import axios from "axios";

const TList = () => {
  const [instructor, setInstructor] = useState([]);
  useEffect(() => {
    axios
      .get("/_api/getinstructor")
      .then(res => {
        setInstructor(res.data);
      })
      .catch(err => {});
  }, []);
  const name = instructor.map(data => (
    <Link className="tname" to={"/teacher/" + data.name}>
      <div className="teacher-course">
        <div id="tpic" className="set-center">
          {data.name[0]}
        </div>
        <div>{data.name}</div>
      </div>
    </Link>
  ));
  return <List list={name} head="รายชื่ออาจารย์ผู้สอน" />;
};

export default TList;
