import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Login from './pages/Login'
import Home from './pages/Home';
import { Component } from 'react';
import axios from 'axios';
import GCreate from './pages/GCreate';
import ProfileUpload from './pages/ProfileUpload';
import domain from './domain';
import Create from './pages/Create';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

class App extends Component {
  constructor(props){
    super(props);
    axios.defaults.withCredentials = true;

    this.state = {
      logged : false,
      userId:null
    }
  }

  componentDidMount(){
    axios(`${domain}/auth/check`)
    .then(result=>{
      if(result.status===200){
        this.setState({
          logged:true,
          userId : result.data.userId
        },()=>{
          console.log(this.state);
        })
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }

  render(){
    let gcreate,login,create,profile;
    if(this.state.logged===true){
      gcreate = <Redirect to="/"/>;
      login = gcreate;
      create = login;
      profile = <Route path="/profile/:id" component={Profile}/>;
    }
    else{
      gcreate = <GCreate/>;
      login = <Login/>;
      create = <Create/>
      profile= <Redirect to="/login"/>;
    }
    return (
      <div className="App container-fluid">
        <BrowserRouter>
          <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            {login}
          </Route>
          <Route path="/create/gauth">
            {gcreate}
          </Route>
          <Route exact path="/create">
            {create}
          </Route>
          <Route path="/upload/profile">
            <ProfileUpload to="profile" userId={this.state.userId}/>
          </Route>
          <Route path="/upload/company">
            <ProfileUpload to="company" userId={this.state.userId}/>
          </Route>
          {profile}
          <Route path="/settings">
            <Settings/>
          </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
