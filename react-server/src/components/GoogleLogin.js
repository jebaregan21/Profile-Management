import axios from 'axios';
import React, {Component} from 'react'
import domain from '../domain';
import {withRouter} from 'react-router-dom';
import history from '../history';

class GoogleLogin extends Component{
    
    componentDidMount(){
        window.gapi.signin2.render('google-icon',
        {
            width:175,
            height:50,
            onsuccess : this.onSuccess
        });
    }

    onSuccess = googleUser =>{
        const profile = googleUser.getBasicProfile();
        const id_token = googleUser.getAuthResponse().id_token;
        const userData = {
            token : id_token,
            name : profile.getName(),
            email : profile.getEmail()
        }
        axios.post(`${domain}/gauth`,userData)
        .then(result=>{
            if(result.status===200){
                history.push('/');
            }
            else if(result.status===201){
                localStorage.setItem('name',userData.name);
                localStorage.setItem('email',userData.email);
                localStorage.setItem('token',id_token);
                this.props.history.push('/create/gauth');
            }
            else{
                alert("Something went wrong try to sign in again");
            }
        })
        .catch(err=>{
            history.push('/');
        })
        ;
    }

    render(){
        return(
            <div id="google-icon"></div>
        )
    }
}

export default withRouter(GoogleLogin);