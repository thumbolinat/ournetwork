import React, { Component } from 'react';
import { signup } from "../auth";

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
            password: "",
            error: "",
            open: false
        };
    }

    changeHandler = name => event => {
        this.setState({ error: "" });
        this.setState({ [name]: event.target.value });
    };

    clickSubmit = event => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name, 
            email, 
            password
        };

        signup(user).then(data => {
            if (data.error) this.setState({ error: data.error });
            else
                this.setState({
                    error: "",
                    name: "",
                    email: "",
                    password: "",
                    open: true
                });
        });
    };

    signupForm = (name, email, password) => (
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input
                    onChange={this.changeHandler("name")}
                    type="text"
                    className='form-control'
                    value={name} 
                    />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Email</label>
                <input
                    onChange={this.changeHandler("email")}
                    type="email"
                    className="form-control"
                    value={email}
                    />
            </div>
            <div className='form-group'>
                <label className='text-muted'>Password</label>
                <input
                    onChange={this.changeHandler("password")}
                    type="password"
                    className='form-control'
                    value={password}
                    />
            </div>
            <button
                onClick={this.clickSubmit}
                className="btn btn-raised btn-primary"
            >SUBMIT</button>
        </form>
    );

    render() {
        const { name, email, password, error, open } = this.state;
        return(
            <div className="container">
                <h2 className='mt-5 mb-5'>SIGN UP</h2>

                <div className='alert alert-danger'
                    style={{ display: error ? "" : "none" }}
                >
                    {error}

                </div>

                <div className="alert alert-primary"
                    style={{ display: open ? "" : "none" }}
                >
                    Account created successfully. Please log in.
                </div>

                {this.signupForm(name, email, password)}



            </div>
        );
    }
}

export default Signup;