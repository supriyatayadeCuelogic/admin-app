import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as router from './../../constants/routes';

class Pages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            list: []
        }
    }

    edit = (event,post) =>{
        this.props.editPage(post.uid); 
        this.props.history.push(router.EDIT_PAGE+'/'+post.uid);
    }

    render() {
        return (
            <React.Fragment>
                {this.props.loading && <div>Loading....</div>}
                <ul>
                    {
                        this.props.data.map(key => (
                            <li key={key}>{key.title}
                                <button onClick={event=>this.edit(event,key)}> Edit </button>
                                <button onClick={this.delete}> Delete </button>
                            </li>
                        ))
                    }
                </ul>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    loading: state.loading
})

const mapDispatchToProps = dispatch => ({
    editPage: page =>
      dispatch({ type: 'EDIT_PAGE', id:page.uid })
  });

export default compose(
    withRouter,
    connect(mapStateToProps,mapDispatchToProps))
    (Pages);