import React ,{Component} from 'react';
import { withFirebase } from './../../Firebase';
import { AuthUserContext } from './../../Auth';
import { connect } from 'react-redux';
import { compose } from 'recompose';

class editPage extends Component{
    constructor(props){
        super(props);

        // this.state={
        //     loading:true,
        //     title:'',
        //     content:'',
        //     author:'',
        //     isIndexPage:'',
        //     status:''
        // }
    }

    // onSubmit = (event,authUser) => {

    // }

    render(){
        // const {title,content,isIndexPage,status} = this.state;
        console.log(this.props);
        return (
            <AuthUserContext.Consumer>
                {authUser=>(
                <React.Fragment>
                    <form onSubmit={event=>this.onSubmit(event,authUser)}>
                        <div className="form-group col-md-6">
                            <h1>Create new page</h1>
                            <label>Title</label>
                            <input name="title" className="form-control" value={this.props.title} onChange={this.onChange} type="text" />
                            
                            <label>Content</label>
                            <input name="content" className="form-control" value={this.props.content} onChange={this.onChange} type="text" />

                            <label>Mark as index</label>
                            <input name="isIndexPage" className="form-control" value={this.props.isIndexPage} onChange={this.onChange} type="radio" />

                            <label>Status</label>
                            <select onChange={this.onChange} className="form-control" name="status" value={this.props.status}>
                                <option value="">Select</option>
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>

                            <button type="submit" className="btn btn-primary">Update</button>
                            
                            </div>
                        </form>
                </React.Fragment>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

export default compose(withFirebase,connect())(editPage);