import React, { useEffect, useState } from "react";
import { BrowserRouter as route, Link, useLocation } from "react-router-dom";
import { Paper, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import "../css/base.css";
import "../css/responsive.css";
// import "../css/course.css";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { Search, ContactlessOutlined, NextWeek } from "@material-ui/icons";
import { black } from "@material-ui/core/colors";
import { withStyles, createMuiTheme } from "@material-ui/core/styles";
import SubpaperC from "./subpaperC";
import axios from "axios";

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
const Course = props => {
  const [video, setVideo] = useState([]);
  const [all, setAll] = useState([]);
  const [s, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [p, setP] = useState(1);
  const [maxPage, setMax] = useState(1);
  var amount;
  useEffect(() => {
    axios
      .post("/_api/getpage", {
        page: 1
      })
      .then(res => {
        setVideo(res.data.videos);
        setMax(res.data.maxpage);
        // setMax(5);
      })
      .catch(err => {});
    if (props.location.state.detail !== undefined) {
      axios
        .post("/_api/getbyword", {
          word: props.location.state.detail
        })
        .then(res => {
          setVideo(res.data);
        });
    } else {
      axios
        .get("/_api/getall")
        .then(res => {
          setAll(res.data);
        })
        .catch(err => {});
    }
  }, [props.location.state.detail]);
  const Video = video.map(data => (
    <SubpaperC
      title={data.title}
      instructor={data.instructor}
      subject={data.subject}
      time={data.dateTime}
      key={data._id}
      id={data._id}
      rtmp={data.rtmp}
      back="/course"
      go="/course-video/"
    />
  ));
  const handelSubmit = e => {
    e.preventDefault();
    axios
      .post("/_api/getpage", {
        page: p
      })
      .then(res => {
        setVideo(res.data.videos);
      });
  };
  const handleSearch = e => {
    e.preventDefault();
    axios
      .post("/_api/getbyword", {
        word: s
      })
      .then(res => {
        setVideo(res.data);
      });
  };
  const next = e => {
    if (maxPage === 2) {
      if (p === 1) {
        setP(p + 1);
        document.getElementById("next").style.display = "none";
        document.getElementById("back").style.display = "initial";
      }
    } else {
      if (p < maxPage) {
        setP(p + 1);
        document.getElementById("back").style.display = "initial";
        if (p === maxPage - 1) {
          document.getElementById("next").style.display = "none";
        }
      }
    }
  };
  const back = e => {
    if (maxPage === 2) {
      if (p <= 2) {
        setP(p - 1);
        document.getElementById("back").style.display = "none";
        document.getElementById("next").style.display = "initial";
      }
    } else {
      if (p > 1) {
        setP(p - 1);
        if (p === 2) {
          setP(1);
          document.getElementById("back").style.display = "none";
        }
        if (p === maxPage) {
          document.getElementById("back").style.display = "initial";
          setP(p - 1);
          document.getElementById("next").style.display = "initial";
        }
      }
    }
  };
  return (
    <div>
      <div className="none">
        {(amount = Array.from(Array(maxPage), (x, index) => index + 1))}
      </div>
      <div>
        <div>
          <div className="content">
            <div className="head-part hc">
              <div>
                <Link to="/">
                  <ArrowBackIosIcon id="arrow" />
                </Link>
                <h1 className="head">COURSE</h1>
              </div>
              <div className="filter nor">
                <Link to="/teacher-list">
                  <button class="filter_but" id="filter_t">
                    รายชื่อผู้สอน
                  </button>
                </Link>
                <Link to="/subject-list">
                  <button class="filter_but" id="filter_s">
                    รายชื่อวิชา
                  </button>
                </Link>
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
                    options={all.map(option => option.title)}
                    renderInput={params => (
                      <CssTextField
                        {...params}
                        label="search"
                        margin="normal"
                      ></CssTextField>
                    )}
                  />
                </div>
              </form>
              <div className="course-content nor">
                <Paper className="course-paper">{Video}</Paper>
              </div>
              <div className="none">
                <div className="r-course-part">
                  {Video}
                  <form onSubmit={handelSubmit} className="paginate">
                    {amount.map(i => (
                      <button
                        className="paginat-but set-center"
                        value={i}
                        key={i}
                        onClick={e => setPage(e.target.value)}
                      >
                        {i}
                      </button>
                    ))}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handelSubmit} className="paginate nor">
        <button
          onClick={back}
          id="back"
          type="submit"
          name="back"
          className="paginat-but set-center"
          style={{ display: "none" }}
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        <button
          className="paginat-but set-center"
          value={p}
          onClick={e => setPage(e.target.value)}
          type="submit"
        >
          {p}
        </button>
        {maxPage === 1 ? (
          <button onClick={next} style={{ display: "none" }}></button>
        ) : (
          <button
            onClick={next}
            id="next"
            type="submit"
            name="next"
            className="paginat-but set-center"
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        )}
      </form>
    </div>
  );
};

export default Course;
