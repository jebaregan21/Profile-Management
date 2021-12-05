import React, {Component} from 'react';
import Navbar from '../components/Navbar';
import ListView from '../components/ListView';
import axios from 'axios';
import domain from '../domain';
import '../components/css/Profile.css'

class Home extends Component{

    constructor(props){
        super(props);

        this.state = {
            name:null,
            users:null
        }
        document.title = 'Home';
    }

    componentDidMount(){
        axios.get(`${domain}/`)
        .then(result=>{
            console.log(result);
            this.setState({
                users:result.data
            });
        }
        )
        .catch(err=>{
            console.log(err);
        })
    }

    setName = (data)=>{
        this.setState({
            name : data
        },()=>{
            axios.post(`${domain}/`,{name:this.state.name})
            .then(result=>{
                this.setState({
                    users:result.data
                });
            }
            )
            .catch(err=>{
                console.log(err);
            })
        });
    }

    render(){
        return(
            <div>
                <Navbar active="home" setName={this.setName}/><br/>
                <br/>
                <br/>
                <br/>
                <ListView users={this.state.users}/>   
            </div>
        )
    }
}

export default Home;