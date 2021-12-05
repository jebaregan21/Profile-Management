import axios from "axios";
import React,{Component} from "react";
import domain from "../domain";
import history from "../history";

class Logout extends Component{

    constructor(props){
        super(props);

        this.init();
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

    render(){
        return(
            <div className="dropdown-item brand" onClick={this.signOut}>Logout</div>
        )
    }
}

export default Logout;