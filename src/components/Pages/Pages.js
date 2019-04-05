import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import * as router from './../../constants/routes';
import { withFirebase } from './../Firebase';
// import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
// import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import ReactHtmlParser from 'react-html-parser';
import Moment from 'react-moment';
import { Container, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './../App/App.css';
import PageErrBoundary from './../ErrorBoundries/PageErrBoundary';

class Pages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            list: []
        }
    }

    /*handleInsertButtonClick = (onClick) => {
        this.props.history.push('/createpage');
      }
      createCustomInsertButton = (onClick) => {
        return (
            <button className="btn btn-primary" onClick={ this.handleInsertButtonClick }>Add page</button>
        );
      }      
      options = {
        insertBtn: this.createCustomInsertButton
      };*/

    edit = (event, page) => {
        this.props.applySetPage(page);
        this.props.history.push(router.EDIT_PAGE + '/' + page.uid);
    }

    delete = (event, id) => {
        let res = window.confirm("Are you sure you want to delete this?");
        if (res === true) {
            this.props.firebase.page(id).remove();
        }
    };

    render() {
        return (
            <PageErrBoundary>
                <React.Fragment>
                    <Container>
                        {/* <Row> */}
                        <Col></Col>
                        <Col xs={6} md={6} lg={6}>
                            {this.props.loading && <div>Loading....</div>}
                            <NavLink className="btn btn-primary" to={router.CREATE_PAGE}>Create</NavLink>
                            <br />
                            <br />
                            <table id="table"
                                data-toggle="table"
                                data-search="true"
                                data-filter-control="true"
                                data-show-export="true"
                                data-click-to-select="true"
                                data-toolbar="#toolbar"
                                className="table-striped table-bordered pageTable">
                                <thead>
                                    <tr>
                                        <th data-field="prenom" data-filter-control="input" data-sortable="true">Title</th>
                                        <th data-field="date" data-filter-control="select" data-sortable="true">Content</th>
                                        <th data-field="date" data-filter-control="select" data-sortable="true">Created At</th>
                                        <th data-field="examen" data-filter-control="select" data-sortable="true">Status</th>
                                        <th data-field="note" data-sortable="true">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.props.data.map(key => (
                                            <tr key={key.uid}>
                                                <td>{key.title}</td>
                                                <td>{ReactHtmlParser(key.content)}</td>
                                                <td><Moment format="YYYY/MM/DD">
                                                    {key.createdAt}
                                                </Moment></td>
                                                <td>{key.status}</td>
                                                <td>
                                                    <button className="btn btn-primary" onClick={event => this.edit(event, key)}> Edit </button>
                                                    <button className="btn btn-primary" onClick={event => this.delete(event, key.uid)}> Delete </button>
                                                    <Link className="btn btn-primary" to={`${router.PREVIEW}/${key.title}`}> Preview </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </Col>
                        <Col></Col>
                    </Container>

                </React.Fragment>
            </PageErrBoundary>
        );
    }
}



const mapStateToProps = (state) => ({
    loading: state.loading
})

const mapDispatchToProps = dispatch => ({
    applySetPage: page =>
        dispatch({ type: 'EDIT_PAGE', page })
});

export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps))(Pages);