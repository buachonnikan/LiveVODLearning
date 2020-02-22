import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from "./component/home";
import Live from "./component/live";
import Course from "./component/course";
import Video from "./component/video";
import GoLive from "./component/goLive";
import Form from "./component/form";
import Page401 from "./component/Page401";
import NavHome from "./component/navHome";
import userr from "./component/checkType";
import CourseVideo from "./component/courseVideo";
import TList from "./component/tList";
import SList from "./component/slist";
import { LoggedContext } from "./context/LoggedContext";
import TCourse from "./component/tCourse";
import SCourse from "./component/sCourse";
import Edit from "./component/edit";

const Userr = userr.initt();

function App() {
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState({});
  const [sent, setSent] = useState(false);
  useState(() => {
    Userr.isLogin().then(res => {
      if (res.loggedin) {
        setUser(res.user);
        setLogged(true);
        setSent(true);
      }
    });
  });
  return (
    <>
      <LoggedContext.Provider
        value={{
          isLogged: isLogged,
          setLogged: setLogged,
          user: user,
          setUser: setUser,
          sent: sent
        }}
      >
        <NavHome />
        {/* <hr /> */}
        <BrowserRouter>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/live" component={Live} />
            <Route path="/course" component={Course} />
            <Route path="/goLive" component={GoLive} />
            <Route path="/form" component={Form} />
            <Route path="/edit/:streamkey" component={Edit} />
            <Route path="/video/:streamkey" component={Video} />
            <Route path="/course-video/:streamkey" component={CourseVideo} />
            <Route path="/teacher-list" component={TList} />
            <Route path="/subject-list" component={SList} />
            <Route path="/teacher/:tname" component={TCourse} />
            <Route path="/subject/:sname" component={SCourse} />
            <Route path="/:tname/:streamkey" component={CourseVideo} />
            <Route path="/401" component={Page401} />
          </Switch>
        </BrowserRouter>
      </LoggedContext.Provider>
    </>
  );
}

export default App;
