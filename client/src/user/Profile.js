import React, { Component } from "react";
import { isAuthenticated }  from "../auth/index";
import { Link, Redirect } from "react-router-dom";
import { read } from"./apiUser";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            user: "",
            redirection: false
        };
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirection: true });
            } else {
                this.setState({ user: data });
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    render() {
        const { redirection, user } = this.state;
        if (redirection) return <Redirect to="/login" />;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className="mt-5 mb-5">Profile</h2>
                        <p>Welcome {isAuthenticated().user.name}</p>
                        <p>Email: {isAuthenticated().user.email}</p>
                        <p>{`Member Since: ${new Date(this.state.user.created).toDateString()}`}</p>
                    </div>

                    <div className="col-md-6">
                        {isAuthenticated().user && isAuthenticated().user._id == user._id && (
                            <div className="d-inline-block mt-5">
                                <Link
                                    className="btn btn-raised btn-success mr-5"
                                    to={`/user/edit/${user._id}`}
                                > Edit Profile </Link>
                                <button className="btn btn-raised btn-danger"> Delete Profile </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;
