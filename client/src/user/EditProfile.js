import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import { read, update } from "./apiUser";
import { Redirect } from "react-router-dom";

class EditProfile extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            name: "",
            email: "",
            password: "",
            redirection: false,
            error: ""
        };
    }

    init = userId => {
        const token = isAuthenticated().token;
        read(userId, token).then(data => {
            if (data.error) {
                this.setState({ redirection: true });
            } else {
                this.setState({
                    id: data._id,
                    name: data.name,
                    email: data.email,
                    error: ""
                });
            }
        });
    };

    componentDidMount() {
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    validator = () => {
        const { name, email, password } = this.state;
        if (name.length === 0) {
            this.setState({ error: "Name Required!" });
            return false;
        }
        // eslint-disable-next-line
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            this.setState({ error: "Email Required!"});
            return false;
        }
        if (password.length >= 1 && password.length <= 5) {
            this.setState({
                error: "Minimum Password lenght is 6 Characters!"
            });
            return false;
        }
        return true;
    };

    changeHandler = name => event => {
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();

        if(this.validator()) {
            const { name, email, password } = this.state;
            const user = {
                name,
                email,
                password: password || undefined
            };
            console.log(user);
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token, user).then(data => {
                if(data.error) this.setState({ error: data.error });
                else
                    this.setState({
                        redirection: true
                    });
            });
        }    
    };

    signupForm = (name, email, password) => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={this.changeHandler("name")}
                    type="text"
                    className="form-control"
                    value={name}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={this.changeHandler("email")}
                    type="email"
                    className="form-control"
                    value={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={this.changeHandler("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >
                Update
            </button>
        </form>
    );

    render() {
        const { id, name, email, password, redirection, error } = this.state;

        if (redirection) {
            return <Redirect to={`/user/${id}`} />;
        }

        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Edit Profile</h2>
                <div
                    className="alert alert-danger"
                    style={{ display: error ? "" : "none" }}
                >
                    {error}
                </div>

                {this.signupForm(name, email, password)}
            </div>
        );
    }
}

export default EditProfile;