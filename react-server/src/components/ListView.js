import domain from "../domain";
import {Link} from 'react-router-dom';
import './css/List.css';

function ListView(props){
    console.log(props);
    return(
        <div>
            <table className="table table-stripped table-hover">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Occupation</th>
                    <th scope="col">Company</th>
                    <th scope="col">City</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.users!==null ? 
                        props.users.map((user,index) => {
                            return(
                                <tr key={user._id}>
                                <th scope="row">{index+1}</th>
                                <td><Link to={`/profile/${user._id}`} className="link-text">
                                    <img src={`${domain}/static/profile/${user._id}.jpg`}
                                        className="rounded-circle"
                                        height="50"
                                        alt=""
                                        loading="lazy"/>
                                    </Link>
                                </td>
                                <td><Link to={`/profile/${user._id}`} className="link-text">{user.name}</Link></td>
                                <td>{user.occupation}</td>
                                <td>{user.company}</td>
                                <td>{user.city}</td>
                                <td><Link to={`/profile/${user._id}`} className="view"><i class="material-icons">&#xE5C8;</i></Link></td>
                            </tr>
                            )})
                        :
                        <tr/>
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

export default ListView;