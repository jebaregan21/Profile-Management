import React, { Component } from 'react';
import '../components/css/Settings.css';
import {Modal} from 'react-bootstrap';
import axios from 'axios';
import domain from '../domain';
import history from '../history';
import Navbar from '../components/Navbar';

class Settings extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loaded : false,
            name : false,
            mobile : false,
            email : false,
            address : false,
            image : null,
            password : false,
            company : false,
            companyImage : false,
            imagepreview : null,
            hidden:true,
            mName:false,mMobile:false,mEmail:false,mPassword:false,mCompany:false,mAddress:false,mOccupation:false,mProfile:false,mCompanypic:false
        }
        document.title = 'Settings';
    }
    
    handleClose = e =>{
        this.setState({mName:false,mMobile:false,mEmail:false,mPassword:false,mCompany:false,
            mAddress:false,mOccupation:false,mProfile:false,mCompanypic:false,image:null,imagepreview:null,hidden:true});
    }

    componentDidMount(){
        axios.get(`${domain}/settings`)
        .then(result=>{
            if(result.status===200){
                console.log(result);
                this.setState({
                    firstName:result.data.user.name,
                    userId : result.data.user._id,
                    user:result.data.user,
                    loaded: true
                });
            }
            else{
                console.log(result);
                alert('Login to proceed');
            }
        }).catch(error=>{
            console.log(error)
        })
        document.title = 'Settings'
    }

    submit = e =>{
        e.preventDefault();
        let data = null;
        console.log(e.target.name);
        if(e.target.name!=='profile' && e.target.name!=='companypic'){
            data = this.state;
        }
        else{
            data = new FormData();
            data.append('userId',this.state.user._id);
            data.append('image',this.state.image);
            console.log(data.get('userId'));
            
        }
        axios.post(`${domain}/settings/${e.target.name}`,data)
        .then(result=>{
            if(result.status===200){
                console.log(result);
                history.push('/settings');
            }
            else if(result.status===201){
                axios.get(`${domain}/logout`)
                .then(result=>{
                    history.push('/');
                })
                .catch(err=>{
                    console.log(err);
                })
            }
            else{
                alert('Invalid credentials');
            }
        }).catch(error=>{
            console.log(error)
        })
    }

    dataSetter = e =>{
        this.setState({[e.target.name]:e.target.value})
    }

    imageSetter = e =>{
        if(e.target.files[0]===null || e.target.files[0]===undefined){
            this.setState({[e.target.name]:null})
        }
        else{
            this.setState({
                imagepreview:URL.createObjectURL(e.target.files[0]),
                [e.target.name]:e.target.files[0],
                hidden:false
            })
        }
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

    render() {
        return (
            <div className="container-fluid">
                {this.state.loaded ?
                <div> 
                    <Navbar />
                    <div className="col-12 " style={{marginTop:'7%'}}>
                        <div className="d-flex justify-content-center">
                        <div className="d-flex  flex-column align-items-start bd-highlight mb-3">
                            <div className="mt-5 mb-3 text-center d-flex">
                                <div className="edit d-inline">
                                    <img onClick={()=>this.setState({mProfile:true})} className="img-fluid rounded rounded-circle" src={`${domain}/static/profile/${this.state.userId}.jpg`}
                                        style={{width: "120px" , height: "120px"}} alt=""/>
                                    <div className="mt-1 promptt text-center text-primary">Click on the image to change</div>   
                                </div> 
                                <div className="edit d-inline">
                                    <img onClick={()=>this.setState({mCompanypic:true})} className="img-fluid" src={`${domain}/static/company/${this.state.userId}.jpg`}
                                        style={{width: "200px" , height: "120px"}} alt=""/>
                                    <div className="mt-1 promptt text-center text-primary">Click on the company logo to change</div>   
                                </div>
                            </div>
                                <div className="p-0 mb-4 mt-3 ms-5 me-0 pe-0 bd-highlight fs-4">
                                    Name&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.user.name}&nbsp;&nbsp;<button className="btn btn-light p-0 pb-2 m-0 " onClick={()=>this.setState({mName:true})} type="button"><i className=" text-primary bi bi-pencil-square"></i></button>
                                </div>
                                <div className="p-0 mb-4 ms-5 me-0 pe-0 bd-highlight fs-4">
                                    Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.user.email}&nbsp;&nbsp;{this.state.user.gauth===false ? <button className="btn btn-light p-0 pb-2 m-0 " onClick={()=>this.setState({mEmail:true})} type="button"><i className=" text-primary bi bi-pencil-square"></i></button> : null}
                                </div>
                                <div className="p-0 mb-4 ms-5 me-0 pe-0 bd-highlight fs-4">
                                    Mobile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {this.state.user.mobile}&nbsp;&nbsp;<button className="btn btn-light p-0 pb-2 m-0 " onClick={()=>this.setState({mMobile:true})} type="button"><i className=" text-primary bi bi-pencil-square"></i></button>
                                </div>
                                
                                <div className="p-0 mb-4 ms-5 me-0 pe-0 bd-highlight fs-4">Address&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : {this.state.user.address}, {this.state.user.city}, {this.state.user.state}, {this.state.user.country} - {this.state.user.pincode}&nbsp;&nbsp;<button className="btn btn-light p-0 pb-2 m-0 " onClick={()=>this.setState({mAddress:true})} type="button"><i className=" text-primary bi bi-pencil-square"></i></button>
                                </div>
                                <div className="p-0 mb-4 ms-5 me-0 pe-0 bd-highlight fs-4">Occupation&nbsp; : {this.state.user.occupation}&nbsp;&nbsp;<button className="btn btn-light p-0 pb-2 m-0 " onClick={()=>this.setState({mOccupation:true})} type="button"><i className="text-primary  bi bi-pencil-square"></i></button>
                                </div>
                                <div className="p-0 mb-4 ms-5 me-0 pe-0 bd-highlight fs-4">Company&nbsp; : {this.state.user.company}&nbsp;&nbsp;<button className="btn btn-light p-0 pb-2 m-0 " onClick={()=>this.setState({mCompany:true})} type="button"><i className="text-primary  bi bi-pencil-square"></i></button>
                                </div>
                                {this.state.user.gauth===false ? <div className="p-0 ms-5 me-0 pe-0 bd-highlight "><button className="btn btn-light p-0 pb-3 mx-auto linkdisable text-primary " onClick={()=>this.setState({mPassword:true})} >Change Password&nbsp;&nbsp;<i className="bi bi-arrow-up-right-square"></i></button> 
                                </div>:null}
                            </div>
                        </div>
                    </div>
                    
                    <Modal show={this.state.mName} onHide={this.handleClose}>
                            <Modal.Header>
                            <Modal.Title>Change name</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form name="name" onSubmit={this.submit}>
    
                                <div className="row mt-2 px-4 justify-content-left">
                                    <label htmlFor="degree" className="form-label p-0">Name&nbsp;<span
                                            className="text-danger">*</span></label>
                                    <input className="form-control" name="uname" type="text" onChange={this.dataSetter} required/>
                                </div>
    
                                <div className="text-center p-4">
                                    <button type="submit" className="btn btn-primary text-center">Change</button>
                                </div>
    
                            </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.handleClose}>
                                Close
                            </button>
                            </Modal.Footer>
                        </Modal>
    
                        <Modal show={this.state.mProfile} onHide={this.handleClose}>
                            <Modal.Header >
                            <Modal.Title>Change image</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h2>Upload your profile picture</h2>
                                <form id="file-upload-form" className="uploader p-1" encType="multipart/form-data" name="profile" onSubmit={this.submit}>
                                <input id="file-upload" type="file" name="image" onChange={this.imageSetter} accept="image/jpeg" required/>
    
                                <label htmlFor="file-upload" id="file-drag">
                                    <img id="file-image" className="rounded-circle" loading="lazy" src={this.state.imagepreview} alt="Preview" hidden={this.state.hidden}/>
                                    <div id="start">
                                    <i className="fa fa-download" aria-hidden="true"></i>
                                    <div hidden={!this.state.hidden}>Select a file(.jpeg)</div>
                                    <div id="notimage" className="hidden">Please select an image</div>
                                    <span id="file-upload-btn" className="btn btn-primary" hidden={!this.state.hidden}>Select a file</span>
                                    </div>
                                    <div id="response" className="hidden">
                                    <div id="messages"></div>
                                    <progress className="progress" id="file-progress" value="0">
                                        <span>0</span>%
                                    </progress>
                                    </div>
                                </label>
                                <button type="submit" className="uploader btn mx-auto">Upload</button>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.handleClose}>
                                Close
                            </button>
                            </Modal.Footer>
                        </Modal>
    
                        <Modal show={this.state.mCompanypic} onHide={this.handleClose}>
                            <Modal.Header >
                            <Modal.Title>Change company logo</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h2>Upload your company logo</h2>
                                <form id="file-upload-form" className="uploader p-1" encType="multipart/form-data" name="companypic" onSubmit={this.submit}>
                                <input id="file-upload" type="file" name="image" onChange={this.imageSetter} accept="image/jpeg" required/>
    
                                <label htmlFor="file-upload" id="file-drag">
                                    <img id="file-image" className="rounded-circle" loading="lazy" src={this.state.imagepreview} alt="Preview" hidden={this.state.hidden}/>
                                    <div id="start">
                                    <i className="fa fa-download" aria-hidden="true"></i>
                                    <div hidden={!this.state.hidden}>Select a file(.jpeg)</div>
                                    <div id="notimage" className="hidden">Please select an image</div>
                                    <span id="file-upload-btn" className="btn btn-primary" hidden={!this.state.hidden}>Select a file</span>
                                    </div>
                                    <div id="response" className="hidden">
                                    <div id="messages"></div>
                                    <progress className="progress" id="file-progress" value="0">
                                        <span>0</span>%
                                    </progress>
                                    </div>
                                </label>
                                <button type="submit" className="uploader btn mx-auto">Upload</button>
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.handleClose}>
                                Close
                            </button>
                            </Modal.Footer>
                        </Modal>
                        
                        <Modal show={this.state.mEmail} onHide={this.handleClose}>
                            <Modal.Header >
                            <Modal.Title>Change email</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form name="email" onSubmit={this.submit}>
                                <div className="row mt-2 px-4 justify-content-left">
                                    <label htmlFor="degree" className="form-label p-0">Email&nbsp;<span
                                            className="text-danger">*</span></label>
                                    <input className="form-control" name="email" type="text" onChange={this.dataSetter} required/>
                                </div>
                                <div className="text-center p-4">
                                    <button type="submit" className="btn btn-primary text-center">Change</button>
                                </div>
                            </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.handleClose}>
                                Close
                            </button>
                            </Modal.Footer>
                        </Modal>
                        
                        <Modal show={this.state.mPassword} onHide={this.handleClose}>
                            <Modal.Header >
                            <Modal.Title>Change password</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form name="password" onSubmit={this.submit}>
                            <div className="col-sm-12">
                                        <div className="row mt-2 px-4 justify-content-left">
    
                                            <label htmlFor="oldpassword" className="form-label p-0">Enter Old Password&nbsp;<span
                                                    className="text-danger">*</span></label>
                                            <input type="password" className="form-control" name="oldpassword" onChange={this.dataSetter} required/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="row mt-2 px-4 justify-content-left">
    
                                            <label htmlFor="newpassword" className="form-label p-0">New Password&nbsp;<span
                                                    className="text-danger">*</span></label>
                                            <input type="password" className="form-control"  name="password" onChange={this.dataSetter} required/>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="row mt-2  px-4 justify-content-left">
                                            <label htmlFor="confirmPassword" className="form-label p-0">Confirm Password&nbsp;<span
                                                    className="text-danger">*</span></label>
                                            <input type="password" className="form-control" name="repassword" onChange={this.dataSetter} required/>
                                        </div>
                                    </div>
                                <div className="text-center p-4">
                                    <button type="submit" className="btn btn-primary text-center">Change</button>
                                </div>
                            </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.handleClose}>
                                Close
                            </button>
                            </Modal.Footer>
                        </Modal>
    
                        <Modal show={this.state.mMobile} onHide={this.handleClose}>
                            <Modal.Header >
                            <Modal.Title>Change mobile number</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form name="mobile" onSubmit={this.submit}>
    
                                <div className="row mt-2 px-4 justify-content-left">
                                    <label htmlFor="institution" className="form-label p-0">Mobile&nbsp;<span
                                            className="text-danger">*</span></label>
                                    <input className="form-control" name="mobile" type="text" onChange={this.dataSetter} required/>
                                </div>
                                <div className="text-center p-4">
                                    <button type="submit" className="btn btn-primary text-center">Change</button>
                                </div>
                            </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.handleClose}>
                                Close
                            </button>
                            </Modal.Footer>
                        </Modal>
    
                        <Modal show={this.state.mCompany} onHide={this.handleClose}>
                            <Modal.Header >
                            <Modal.Title>Change company name</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form name="company" onSubmit={this.submit}>
    
                                <div className="row mt-2 px-4 justify-content-left">
                                    <label htmlFor="institution" className="form-label p-0">Company&nbsp;<span
                                            className="text-danger">*</span></label>
                                    <input className="form-control" name="company" type="text" onChange={this.dataSetter} required/>
                                </div>
                                <div className="text-center p-4">
                                    <button type="submit" className="btn btn-primary text-center">Change</button>
                                </div>
                            </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.handleClose}>
                                Close
                            </button>
                            </Modal.Footer>
                        </Modal>
                        
                        <Modal show={this.state.mOccupation} onHide={this.handleClose}>
                            <Modal.Header >
                            <Modal.Title>Change Occupation</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <form name="occupation" onSubmit={this.submit}>
    
                                <div className="row mt-2 px-4 justify-content-left">
                                    <label htmlFor="institution" className="form-label p-0">Occupation&nbsp;<span
                                            className="text-danger">*</span></label>
                                    <input className="form-control" name="occupation" type="text" onChange={this.dataSetter} required/>
                                </div>
                                <div className="text-center p-4">
                                    <button type="submit" className="btn btn-primary text-center">Change</button>
                                </div>
                            </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.handleClose}>
                                Close
                            </button>
                            </Modal.Footer>
                        </Modal>
    
                        <Modal show={this.state.mAddress} onHide={this.handleClose}>
                            <Modal.Header >
                            <Modal.Title>Change address</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form className="mx-auto" name="address" onSubmit={this.submit}>
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
                                </div>
                                <div className="form-group m-3 d-flex justify-content-around">
                                    <div className="form-group">
                                        <label htmlFor="country" className="style-text d-flex justify-content-start">Country</label>
                                        <input className="form-control" type="text" name="country" id="country" onChange={this.dataSetter} required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="pincode" className="style-text d-flex justify-content-start">Pincode</label>
                                        <input className="form-control" type="number" name="pincode" onChange={this.setPincode} id="pincode" required />
                                    </div>
                                </div>
                                <div className="form-group m-4">
                                    <button className="btn btn-primary" type="submit">Change</button>
                                </div>
                            </form>
                            </Modal.Body>
                            <Modal.Footer>
                            <button className="btn btn-secondary" onClick={this.handleClose}>
                                Close
                            </button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                        :
                    <div/>
                }
            </div>
        )
    }
}

export default Settings
