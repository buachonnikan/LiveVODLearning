import React, { useEffect, useState } from "react";
import { BrowserRouter as route, Link } from "react-router-dom";
import { Paper, TextField } from "@material-ui/core";
import "../css/base.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Search } from "@material-ui/icons";
import { black } from "@material-ui/core/colors";
import { Autocomplete } from "@material-ui/lab";
import axios from "axios";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "black"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black"
    }
  }
})(TextField);
const TList = () => {
  const [instructor, setInstructor] = useState([]);
  const [s, setSearch] = useState("");
  useEffect(() => {
    axios
      .post("/_api/getinstructor", {
        word: ""
      })
      .then(res => {
        console.log(res.data);
        setInstructor(res.data);
      })
      .catch(err => {});
  }, []);

  const handleSearch = e => {
    e.preventDefault();
    axios
      .post("/_api/getinstructor", {
        word: s
      })
      .then(res => {
        setInstructor(res.data);
      });
  };

  const name = instructor.map(data => (
    <Link className="tname" to={"/teacher/" + data.name}>
      <div className="teacher-course">
        <div id="tpic" className="set-center">
          {/* {data.name[0]} */}
        </div>
        <div>{data.name}</div>
      </div>
    </Link>
  ));
  return (
    <div>
      <div>
        <div>
          <div className="content">
            <div className="head-content">
              <div>
                <Link to={{ pathname: "/course", state: { detail: null } }}>
                  <ArrowBackIosIcon className="arrow" />
                </Link>
                <h1 className="subhead" id="t-subhead">
                  รายชื่ออาจารย์ผู้สอน
                </h1>
              </div>
            </div>
            <div>
              <form className="search" onSubmit={handleSearch}>
                <div class="s-contain">
                  <Search />
                  <Autocomplete
                    onChange={(event, value) => setSearch(value)}
                    freeSolo
                    id="search"
                    autoSelect={true}
                    options={instructor.map(option => option.name)}
                    renderInput={params => (
                      <CssTextField
                        {...params}
                        label="search"
                        // id="search"
                        margin="normal"
                      ></CssTextField>
                    )}
                  />
                </div>
              </form>
              <Paper className="course-paper">
                {name.length > 5 ? (
                  <div className="testt">{name}</div>
                ) : (
                  <div>{name}</div>
                )}
              </Paper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// <List list={name} head="รายชื่ออาจารย์ผู้สอน" />;

export default TList;
