import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { login, authenticate } from "../auth";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            error: "",
            redirection: false,
            loading: false
        };
    }

    changeHandler = name => event =>  {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = {
            email,
            password
        };
        console.log(user);
        login(user).then(data => {
            if (data.error) {
                this.setState({ error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    this.setState({ redirection: true });
                });
            }
        });
    };

    loginForm = (email, password) => (
        <form>
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
                Submit
            </button>
        </form>
    );

    render() {
        const { email, password, error, redirection, loading } = this.state;

        if(redirection) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <h2 className='mt-5 mb-5'>LOG IN</h2>

                <div className='alert alert-danger' style={{ display: error ? "" : "none"}}>

                    {error}

                </div>

                {loading ? 
                    (<div className='jumbotron text-center'>
                        <h2> Loading..</h2>
                    </div>
                    ):(
                        ""
                    )}

                {this.loginForm(email, password)}
            </div>
        );
    }
}

export default Login;
