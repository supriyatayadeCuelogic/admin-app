import React ,{Component} from 'react';
import { withFirebase } from './../../Firebase';
import { AuthUserContext } from './../../Auth';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import PropTypes from 'prop-types';


class editPage extends Component{
    static contextTypes = {
        router: PropTypes.object,
        store: PropTypes.object
      };
    
      static propTypes = {
        params: PropTypes.object,
        post: PropTypes.object,
      };
    
      constructor(props, context) {
        super(props, context);
    
        this.state = {
          ...this.state,
        //   postId: this.props.params.postId,
        //   post: {title: '', body: ''}
        };

        console.log('contextTypes',this.contextTypes);
      }

    componentDidMount () {
        // console.log(this.context.redux.getState());
      }

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