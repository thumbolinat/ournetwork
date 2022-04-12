import React from "react";
import { Link, withRouter } from "react-router-dom";
import { logout, isAuthenticated } from "../auth"

const isActive = (history, path) => {
    if (history.location.pathname === path) return { color: "#ff9900" };
    else return { color: "#ffffff" };
};



const Menu = ({ history }) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                > HOME </Link>
            </li>

            {!isAuthenticated() && (  
                <>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/login")}
                            to="/login"
                        > LOG IN </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                        to="/signup"
                        > SIGN UP</Link>
                    </li>
                </> 
            )}

            {isAuthenticated() && (
                <>
                    <li className="nav-item">
                        <a
                            className="nav-link"
                            style={
                                (isActive(history, "/signup"),
                                { cursor: "pointer", color: "#fff" })
                            }
                            onClick={() => logout(() => history.push("/"))}
                        > LOG OUT</a>
                    </li>

                    <li className="nav-item">
                        <Link
                            to={`/user/${isAuthenticated().user._id}`}
                            style={{ color: "#fff" }}
                            className="nav-link"
                        >
                            {`${isAuthenticated().user.name}'s Profile`}
                        </Link>
                    </li>         
                </>
            )}
        </ul>
    </div>
);

export default withRouter(Menu);