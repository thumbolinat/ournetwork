import React from "react";
import { Route, Switch } from "react-router-dom";
import Menu from "./main/Menu";
import Home from "./main/Home";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Profile from "./user/Profile";

const MainRouter = () => (
    <div>
        <Menu />
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/user/:userId" component={Profile} />
        </Switch>
    </div>
);

export default MainRouter;