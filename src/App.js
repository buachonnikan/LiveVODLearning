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
import { LoggedContext } from "./context/LoggedContext";

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
            <Route path="/video/:streamkey" component={Video} />
            <Route path="/course-video/:streamkey" component={CourseVideo} />
            <Route path="/401" component={Page401} />
          </Switch>
        </BrowserRouter>
      </LoggedContext.Provider>
    </>
  );
}

export default App;
