import React ,{Component} from 'react';
import { AuthUserContext } from './../../Session';
import { withFirebase } from './../../Firebase';
// import { compose } from 'recompose';

class createPage extends Component{
    constructor(props){
        super(props);

        this.state={
            loading:true,
            title:'',
            content:'',
            author:'',
            isIndexPage:'',
            status:''
        }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = (event, authUser) => {

        // if (this.validator.allValid()) {
            this.props.firebase.pages().push({
                title: this.state.title,
                content: this.state.content,
                isIndexPage: this.state.isIndexPage,
                status: this.state.status,
                userId: authUser.uid,
                author: authUser.username,
                createdAt: this.props.firebase.serverValue.TIMESTAMP
            });

            this.setState({ title: '', description: '', author: '', category: '', status: '' });

            event.preventDefault();
            window.location.href='/home';
        // } else {
        //     this.validator.showMessages();
        //     this.forceUpdate();
        // }
    };

    render(){
        const {title,content,isIndexPage,status} = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser=>(
                <React.Fragment>
                    <form onSubmit={event=>this.onSubmit(event,authUser)}>
                        <div className="form-group col-md-6">
                            <h1>Create new page</h1>
                            <label>Title</label>
                            <input name="title" className="form-control" value={title} onChange={this.onChange} type="text" />
                            
                            <label>Content</label>
                            <input name="content" className="form-control" value={content} onChange={this.onChange} type="text" />

                            <label>Mark as index</label>
                            <input name="isIndexPage" className="form-control" value={isIndexPage} onChange={this.onChange} type="radio" />

                            <label>Status</label>
                            <select onChange={this.onChange} className="form-control" name="status" value={status}>
                                <option value="">Select</option>
                                <option value="Draft">Draft</option>
                                <option value="Published">Published</option>
                            </select>

                            <button type="submit" className="btn btn-primary">Create</button>
                            
                            </div>
                        </form>
                </React.Fragment>
                )}
            </AuthUserContext.Consumer>
        );
    }
}

export default withFirebase(createPage);