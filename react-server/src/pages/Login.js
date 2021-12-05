import axios from 'axios';
import React, {Component} from 'react';
import domain from '../domain';
import '../components/css/Login.css';
import {Link} from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';
import history from '../history';

class Login extends Component{

    constructor(props){
        super(props);

        this.state = {
            email : null,
            password : null
        }
        document.title = 'login';
    }

    submit = e =>{
        e.preventDefault();
        axios.post(`${domain}/login`,{email:this.state.email, password:this.state.password})
        .then(result=>{
            if(result.status===200){
                history.push('/');
            }
            else{
                alert('Invalid credentials');
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    dataSetter = e =>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }
    
    render(){
        return(
            <div className="container">
                <div className="w-50 my-auto mx-auto row position-absolute top-50 start-50 translate-middle">
                    <h3 className="style-text mx-auto">USER LOGIN</h3>
                    <form className="col-lg-7 p-2 mx-auto" onSubmit={this.submit} name="loginForm">    
                        <div className="form-group m-3">
                            <label htmlFor="email" className="style-text d-flex justify-content-start m-2">Email</label>
                            <input className="form-control" type="text" name="email" id="email" onChange={this.dataSetter} required/>
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="password" className="style-text d-flex justify-content-start m-2">Password</label>
                            <input className="form-control" type="password" name="password" id="password" onChange={this.dataSetter} required/>
                        </div>
                        <div className="form-group m-4">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                        <div className="m-3">
                            <p>Don't have an account create one <Link to="/create">here</Link></p>
                        </div>
                    </form>
                    <hr className="w-50 mx-auto"></hr>
                    <p>or</p>
                    <p>Sign in with</p>
                    <div className="d-flex justify-content-center">
                        <GoogleLogin />
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;