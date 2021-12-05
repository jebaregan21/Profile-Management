import axios from 'axios';
import {Component} from 'react';
import '../components/css/Profile.css'
import Navbar from '../components/Navbar';
import domain from '../domain';

class Profile extends Component{

    constructor(props){
        super(props);

        this.state={
            myprofile:false,
            user : null
        }
    }
    
    componentDidMount(){
        axios.get(`${domain}/profile/${this.props.match.params.id}`)
        .then(result=>{
            if(result.status===200){
                this.setState({
                    user : result.data.data.user,
                    myprofile : result.data.data.myprofile
                },()=>document.title=this.state.user.name);
            }
            else{
                this.props.history('/login');
            }
        })
        .catch(err=>{
            this.props.history.push('/');
        })
    }

    render(){
        return(
            <div>
            {this.state.user!==undefined && this.state.user!==null?
                <div className="container con mx-auto">
                    <Navbar setName={null} myprofile={this.state.myprofile}/>
                    <br/>
                    <div className="profile-header">
                        <div className="profile-img">
                            <img src={`${domain}/static/profile/${this.state.user._id}.jpg`} width="200" alt="Profile"/>
                        </div>
                        <div className="profile-nav-info">
                            <h3 className="user-name">{this.state.user.name}</h3>
                            <div className="address">
                                <p id="state" className="state">{this.state.user.city}, {this.state.user.country}</p>
                            </div>
                        </div>
                    </div>

                    <div className="main-bd">
                        <div className="left-side">
                        <div className="profile-side">
                            <p className="mobile-no"><i className="fa fa-phone"></i>{this.state.user.mobile}</p>
                            <p className="user-mail"><i className="fa fa-envelope"></i>{this.state.user.email}</p>
                            <div className="user-bio">
                                <br/>
                            <h3>Address</h3>
                            <p className="bio">
                                {this.state.user.address}
                                <br/>City : 
                                {" "+this.state.user.city}
                                <br/>State : 
                                {" "+this.state.user.state}
                                <br/>Country : 
                                {" "+this.state.user.country}
                                <br/>Pincode : 
                                {" "+this.state.user.pincode}
                            </p>
                            </div>

                        </div>
                        </div>
                        <div className="right-side">
                            <div className="mx-auto p-4">
                                <h1 className="mx-auto">Business Details</h1>
                                <br/>
                                <p>Occupation : {this.state.user.occupation}</p>
                                <p>Company : {this.state.user.company}</p>
                                <p>Company logo</p>
                                <img src={`${domain}/static/company/${this.state.user._id}.jpg`} width="300" alt="company"/>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div>
                </div>
            }
            </div>
        );
    }
}

export default Profile;