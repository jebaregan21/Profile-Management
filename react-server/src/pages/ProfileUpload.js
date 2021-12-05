import axios from 'axios';
import {Component} from 'react';
import '../components/css/ProfileUpload.css';
import domain from '../domain';
import history from '../history';
import {withRouter} from 'react-router-dom';

class ProfileUpload extends Component{

    constructor(props){
        super(props);

        this.state = {
            image:null,
            imagepreview : null,
            hidden : true,
            userId : null
        }
    }
    
    componentDidMount(){
        this.setState({
            userId:localStorage.getItem('id')
        });
    }

    imageSetter = e =>{
        if(e.target.files[0]===null || e.target.files[0]===undefined){
            this.setState({[e.target.name]:null})
        }
        else{
            this.setState({
                imagepreview:URL.createObjectURL(e.target.files[0]),
                [e.target.name]:e.target.files[0],
                hidden : false
            },()=>{
                console.log(this.state);
            })
        } 
    }

    onUploadProgress = (progress)=>{
        console.log(progress.loaded);
    }

    submit = e =>{
        e.preventDefault();
        if(this.props.userId===undefined){
            localStorage.clear();
            history.push('/');
        }
        let data = new FormData();
        data.append('userId',this.state.userId);
        data.append('image',this.state.image);
        axios.post(`${domain}/upload/${this.props.to}`,data,{
            onUploadProgress : this.onUploadProgress(ProgressEvent)
        })
        .then(result=>{
            console.log('result',result);
            if(this.props.to==='profile'){
                history.push('/upload/company');
            }
            else{
                history.push('/');
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }

    render(){
        return(
            <div className="m-3">
                <h2>Upload your {this.props.to} picture</h2>

                <form id="file-upload-form" className="uploader p-1" encType="multipart/form-data" onSubmit={this.submit}>
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
            </div>
        )
    }
}

export default withRouter(ProfileUpload);