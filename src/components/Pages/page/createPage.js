import React, { Component } from 'react';
import { AuthUserContext } from './../../Auth';
import { withFirebase } from './../../Firebase';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as routes from './../../../constants/routes';
import PageErrBoundary from './../../ErrorBoundries/PageErrBoundary';

class createPage extends Component {
    constructor(props) {
        super(props);

        this.handleModelChange = this.handleModelChange.bind(this);

        this.state = {
            loading: true,
            title: '',
            content: '',
            author: '',
            isIndexPage: '',
            status: ''
        }
    }

    handleModelChange = (model) => {
        this.setState({
            content: model
        });
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
        this.props.history.push(routes.LANDING);
    };

    render() {
        const { title, content, isIndexPage, status } = this.state;
        return (
            <PageErrBoundary>
                <AuthUserContext.Consumer>
                    {authUser => (
                        authUser === null ? this.props.history.push(routes.LOG_IN) :
                            <React.Fragment>
                                <form onSubmit={event => this.onSubmit(event, authUser)}>
                                    <div className="form-group col-md-6">
                                        <h1>Create new page</h1>
                                        <label>Title</label>
                                        <input name="title" className="form-control" value={title} onChange={this.onChange} type="text" />

                                        <label>Content</label>
                                        <ReactQuill value={content} onChange={this.handleModelChange} theme="snow" />

                                        <input name="isIndexPage" value={isIndexPage} onChange={this.onChange} type="radio" /><label>Mark as index</label>
                                        <br />
                                        <label>Status</label>
                                        <select onChange={this.onChange} className="form-control" name="status" value={status}>
                                            <option value="">Select</option>
                                            <option value="draft">Draft</option>
                                            <option value="published">Published</option>
                                        </select>
                                        <button type="submit" className="btn btn-primary">Create</button>
                                    </div>
                                </form>
                            </React.Fragment>
                    )}
                </AuthUserContext.Consumer>
            </PageErrBoundary>
        );
    }
}

export default compose(withFirebase, withRouter)(createPage);