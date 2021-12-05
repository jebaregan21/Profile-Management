import axios from 'axios';
import React, {Component} from 'react';
import domain from '../domain';
import '../components/css/Create.css';
import history from '../history';
import {withRouter} from 'react-router-dom';

class GCreate extends Component{

    constructor(props){
        super(props);

        this.state = {
            name : '',
            email : '',
            mobile : '',
            address : '',
            occupation : '',
            city : '',
            state : '',
            country : '',
            pincode : '',
            company : ''
        }
        document.title = 'Create an account';
    }

    componentDidMount(){
        this.setState({
            email:localStorage.getItem('email'),
            name:localStorage.getItem('name'),
            id: localStorage.getItem('token')
        })
    }

    onSubmit = e=>{
        e.preventDefault();
        axios.post(`${domain}/create/gauth`,this.state)
        .then(result=>{
            if(result.status===200){
                localStorage.clear();
                console.log(result);
                localStorage.setItem('id',result.data.userId);
                this.props.history.push('/upload/profile');
            }
            else{
                alert('Something went wrong');
            }
        })
        .catch(err=>{
            history.push('/');
        })
    }

    setPincode = e =>{
        this.setState({
            [e.target.name] : e.target.value.trim()
        });
        if(e.target.value.length>5){
            axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`,{withCredentials:false})
            .then(result=>{
                if(result.data[0].Status==='Success'){
                    let postOffice = result.data[0].PostOffice[0];
                    document.getElementById('country').value = postOffice.Country;
                    document.getElementById('city').value = postOffice.Division;
                    document.getElementById('state').value = postOffice.State;
                    this.setState({
                        [e.target.name] : e.target.value,
                        city : postOffice.Division,
                        country : postOffice.Country,
                        state : postOffice.State
                    });
                }
            })
            .catch(err=>{
                console.log(err);
            })
        } 
    }

    dataSetter = e=>{
        this.setState({
            [e.target.name] : e.target.value.trim()
        });
    }
    
    render(){
        return(
            <div className="container ">
                <div className="my-auto mx-auto row position-absolute top-50 start-50 translate-middle">
                    <h3 className="style-text mx-auto">Create an account</h3>
                    <form className="mx-auto" onSubmit={this.onSubmit}>
                        <div className="form-group m-3">
                            <label htmlFor="name" className="style-text d-flex justify-content-start m-2">Name</label>
                            <input className="form-control" type="text" name="name" value={this.state.name} onChange={this.dataSetter} id="name" required/>
                        </div>    
                        <div className="form-group m-3">
                            <label htmlFor="email" className="style-text d-flex justify-content-start m-2">Email</label>
                            <input className="form-control" type="text" name="email" value={this.state.email} id="email" required readOnly/>
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="mobile" className="style-text d-flex justify-content-start m-2">Mobile number</label>
                            <input className="form-control" type="text" name="mobile" id="mobile" onChange={this.dataSetter} required />
                        </div>
                        <h5 className="style-text d-flex justify-content-start m-3">Address details</h5>
                        <div className="form-group m-3 d-flex justify-content-around">
                            <div className="form-group box-div-1 m-1">
                                <label htmlFor="mobile" className="style-text d-flex justify-content-start">Door No.</label>
                                <input className="form-control" type="text" name="door" id="door" onChange={this.dataSetter} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="street" className="style-text d-flex justify-content-start">Street</label>
                                <input className="form-control" type="text" name="street" id="street" onChange={this.dataSetter} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="area" className="style-text d-flex justify-content-start ">Area</label>
                                <input className="form-control" type="text" name="area" id="area" onChange={this.dataSetter} required />
                            </div>
                        </div>
                        <div className="form-group m-3 d-flex justify-content-around">
                            <div className="form-group">
                                <label htmlFor="city" className="style-text d-flex justify-content-start">City</label>
                                <input className="form-control" type="text" name="city" id="city" onChange={this.dataSetter} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state" className="style-text d-flex justify-content-start">State</label>
                                <input className="form-control" type="text" name="state" id="state" onChange={this.dataSetter} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="country" className="style-text d-flex justify-content-start">Country</label>
                                <input className="form-control" type="text" name="country" id="country" onChange={this.dataSetter} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="pincode" className="style-text d-flex justify-content-start">Pincode</label>
                                <input className="form-control" type="number" name="pincode" onChange={this.setPincode} id="pincode" required />
                            </div>
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="occupation" className="style-text d-flex justify-content-start m-2">Occupation</label>
                            <input className="form-control" type="text" name="occupation" id="occupation" onChange={this.dataSetter} required />
                        </div>
                        <div className="form-group m-3">
                            <label htmlFor="company" className="style-text d-flex justify-content-start m-2">Company</label>
                            <input className="form-control" type="text" name="company" id="company" onChange={this.dataSetter} required />
                        </div>
                        <div className="form-group m-4">
                            <button className="btn btn-primary" type="submit">Create</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

}

export default withRouter(GCreate);