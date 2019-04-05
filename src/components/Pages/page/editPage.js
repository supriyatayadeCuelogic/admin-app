import React, { Component } from 'react';
import { withFirebase } from './../../Firebase';
import { AuthUserContext } from './../../Auth';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import ReactQuill from 'react-quill';
import * as routes from './../../../constants/routes';
import PageErrBoundary from './../../ErrorBoundries/PageErrBoundary';

class editPage extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      ...this.state,
      page: null
    };
  }

  componentDidMount() {
    if (this.props && this.props.page) {
      this.setState({
        ...this.state,
        title: this.props.page.title,
        content: this.props.page.content,
        isIndexPage: this.props.page.isIndexPage,
        status: this.props.page.status
      });
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

  onSubmit(event, authUser) {
    this.props.firebase.page(this.props.page.uid).set({
      title: this.state.title,
      content: this.state.content,
      isIndexPage: this.state.isIndexPage,
      status: this.state.status,
      userId: authUser.uid,
      author: authUser.username,
      updatedAt: this.props.firebase.serverValue.TIMESTAMP
    });

    event.preventDefault();
    this.props.history.push(routes.LANDING);
  }

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
                    <h1>Edit page</h1>
                    <label>Title</label>
                    <input name="title" className="form-control" value={title} onChange={this.onChange} type="text" />

                    <label>Content</label>
                    <ReactQuill value={content} onChange={this.handleModelChange} theme="snow" />

                    <label>Mark as index</label>
                    <input name="isIndexPage" value={isIndexPage} onChange={this.onChange} type="radio" />

                    <label>Status</label>
                    <select onChange={this.onChange} className="form-control" name="status" value={status}>
                      <option value="">Select</option>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>

                    <button type="submit" className="btn btn-primary">Update</button>
                  </div>
                </form>
              </React.Fragment>
          )}
        </AuthUserContext.Consumer>
      </PageErrBoundary>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.pageSession.loading,
  page: state.pageSession.page,
  pages: state.pageSession.pages
})

export default compose(withFirebase, connect(mapStateToProps))(editPage);