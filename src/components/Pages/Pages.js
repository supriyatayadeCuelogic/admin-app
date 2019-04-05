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

var _ = require('lodash');

class Pages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pages: [],
            limit: 10,
            sortBy: 'desc',
        }
    }

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

    sortData = (event) => {
        var list = this.state.pages;
        let field = event.target.name;
        list = _.orderBy(list, field, this.state.sortBy);
        this.setState({ pages: list, sortBy: this.state.sortBy == 'asc' ? 'desc' : 'asc' });
    }

    componentDidMount() {
        if (!this.state.pages) {
            this.setState({ loading: true });
        }

        this.getPages();
    }

    getPages = () => {
        this.setState({ loading: true });
        this.props.firebase.pages().limitToLast(this.state.limit).on(
            'value', snapshot => {
                const pagesObj = snapshot.val();
                if (pagesObj) {
                    const pagesList = Object.keys(pagesObj).map(key => ({
                        ...pagesObj[key],
                        uid: key
                    }));
                    this.setState({ loading: false, pages: pagesList })
                } else {
                    this.setState({ loading: false, pages: null })
                }
            }
        )
    }

    render() {
        const { pages } = this.state;
        if (pages === null) {
            return null;
        }
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
                                        <th data-field="prenom" data-filter-control="input" data-sortable="true">
                                            <a onClick={event => this.sortData(event)} name="title">Title</a>
                                        </th>
                                        <th data-field="date" data-filter-control="select" data-sortable="true">
                                            <a onClick={event => this.sortData(event)} name="content">Content</a></th>
                                        <th data-field="date" data-filter-control="select" data-sortable="true">
                                        <a onClick={event => this.sortData(event)} name="createdAt">Created At</a></th>
                                        <th data-field="examen" data-filter-control="select" data-sortable="true">
                                        <a onClick={event => this.sortData(event)} name="status">Status</a></th>
                                        <th data-field="note" data-sortable="true">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        pages.map(key => (
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

                        {/* <BootstrapTable data={this.props.data} striped hover options={this.options} insertRow>
                            <TableHeaderColumn dataSort={true} isKey dataField='title'>Title</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='content'>Content</TableHeaderColumn>
                            <TableHeaderColumn dataSort={true} dataField='status'>Status</TableHeaderColumn>
                            <TableHeaderColumn dataField='action' export={false}>Action</TableHeaderColumn>
                        </BootstrapTable> */}


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