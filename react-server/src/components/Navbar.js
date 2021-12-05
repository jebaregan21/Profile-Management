import './css/Navbar.css';
import {NavLink} from 'react-router-dom';
import Logout from '../components/Logout';
import { Component } from 'react';
import axios from 'axios';
import domain from '../domain';
import history from '../history';

class Navbar extends Component{
    
    constructor(props){
        super(props);
        
        this.state={
            logged : false,
            name : '',
            userId : '',
            searchName : ''
        };
    }

    componentDidMount(){
        axios.get(`${domain}/auth/check`)
        .then(result=>{
            console.log(result);
            if(result.status===200){
                this.setState({
                    logged:true,
                    name:result.data.name,
                    userId : result.data.userId
                });
            }
            // else{
            //     this.signOut();
            // }
        })
        .catch(err=>{
            // this.signOut();
        })
    }

    init = () =>{
        window.gapi.load('auth2',()=>{
            window.gapi.auth2.init();
        });
    }

    signOut = ()=>{
        const auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut()
        .then(() => {
            axios.get(`${domain}/logout`)
            .then(result=>{
                if(result.status===200){
                    console.log('User logged out');
                    history.push('/');
                }
            })
        });
    }

    dataSetter = e=>{
        this.setState({
            searchName:e.target.value
        })
    }

    submit = e=>{
        e.preventDefault();
        this.props.setName(this.state.searchName);
    }

    render(){
        return(
            <div className="row p-0 m-0 bg-dark fixed-top">
                <div className="col-12 p-0 m-0">
                    <div className="d-block bg-dark text-light p-0 m-0">
                        <div className="d-md-flex flex-row justify-content-center mt-1 p-0 m-0">
                            <div className="col-md-3">
                                <div className="d-flex flex-row justify-content-start">
                                    <NavLink to="/"><div className="p-2 pb-2 mb-1 fw-bold text-light fs-4 ms-4 brand">Direct</div></NavLink>
                                    <div className={(this.props.active==='home')?'p-2 current mt-1 nav-break text-light bg-secondary mb-2':"p-2  mt-1 nav-break text-light"}> <NavLink className="linkdisable " to="/">Home</NavLink>
                                    </div>
                                    {this.state.logged===true?
                                    <div className={(this.props.myprofile===true)?'p-2 current mt-1 nav-break text-light bg-secondary mb-2':"p-2 mt-1 nav-break text-light"}> <NavLink className="linkdisable " to={`/profile/${this.state.userId}`}>Profile</NavLink></div>
                                    :
                                    <div/>}
                                </div>
                            </div>
                            {this.props.setName!==null && this.props.setName!==undefined? 
                                <form className="col-md-5 mb-1 d-flex p-2" onSubmit={this.submit}>
                                    <input className="form-control ms-sm-5 me-2 " name="search" type="search" placeholder="Search users"
                                            aria-label="Search" onChange={this.dataSetter}/>
                                    <button className="btn btn-outline-light"  type="submit">Search</button>
                                </form>
                                :
                                <div className="col-md-5 mb-1 d-flex p-2"></div>
                            }
                            <div className="col-md-1 mt-1"></div>
                            <div className="col-md-3">
                                <div className="d-flex flex-row justify-content-evenly">
                                    {this.state.logged===true ?
                                        <div className="dropdown text-center">
                                            <div className="p-2 mt-1 me-3 linkdisable dropdown-toggle" type="button"
                                                id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                <img
                                                src={`http://localhost:8000/static/profile/${this.state.userId}.jpg`}
                                                className="rounded-circle"
                                                height="35"
                                                alt=""
                                                loading="lazy"
                                                />
                                            </div>
                                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButton2">
                                                <li><NavLink className="dropdown-item" to="/settings">Account Settings</NavLink></li>
                                                <li><Logout/></li>
                                            </ul>
                                        </div>
                                        :
                                        <div className="p-2 mt-1 nav-break text-light"> <NavLink className="linkdisable " to="/login">Login</NavLink></div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        )
    }
}

export default Navbar;