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
// import user from "./component/checkType";
import NavHome from "./component/navHome";
import { LoggedContext } from "./context/LoggedContext";

// const Userr = user.initt();

function App() {
  // const [name, setName] = useState();
  // useEffect(() => {
  //   Userr.checkTypeGetName(["t", "s"], false).then(name => setName(name));
  // });
  const [isLogged, setLogged] = useState(false);
  return (
    <>
      <LoggedContext.Provider value={isLogged}>
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
            <Route path="/401" component={Page401} />
          </Switch>
        </BrowserRouter>
      </LoggedContext.Provider>
    </>
  );
}

export default App;
