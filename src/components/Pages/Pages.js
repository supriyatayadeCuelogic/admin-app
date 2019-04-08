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
import './../App/App.css';

const _ = require('lodash');

class Pages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pages: [],
            limit: 10,
            sortBy: 'desc',
            activePage: 1,
            searchText:'',
            perPage:3
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
        this.setState({ pages: list, sortBy: this.state.sortBy === 'asc' ? 'desc' : 'asc' });
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
                    this.setState({ loading: false, pages: pagesList });
                    let pagesData = this.getPaginatedItems(pagesList, 1, this.state.perPage);
                    this.props.applySetPages(pagesData.data);
                    this.setState({ paginationObj: pagesData });

                } else {
                    this.setState({ loading: false, pages: null })
                }
            }
        )
    }

    getNextPage(page) {
        console.log(page);
        let pagesData = this.getPaginatedItems(this.state.pages, page, this.state.perPage);
        this.props.applySetPages(pagesData.data);
        this.setState({ paginationObj: pagesData });
    }

    getPaginatedItems(items, page, pageSize) {
        var pg = page || 1,
            pgSize = pageSize || 100,
            offset = (pg - 1) * pgSize,
            pagedItems = _.drop(items, offset).slice(0, pgSize);
        return {
            page: pg,
            pageSize: pgSize,
            total: items.length,
            total_pages: Math.ceil(items.length / pgSize),
            data: pagedItems
        };
    }

    onSeach = event => {
        console.log('state',this.state);
        console.log('props',this.props);
        this.setState({ pages: this.props.pages });
        if (this.state.searchText == '') {
            var sortedObject = this.state.pages;
        } else {
            var sortedObject = _.filter(this.props.pages, { 'title': this.state.searchText });
        }
        
        this.props.applySetPages(sortedObject);
    }

    onChangeSearch = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const { pages } = this.props;
        if (pages === null) {
            return null;
        }
        const { searchText } = this.state;

        const paginationObj = this.state.paginationObj;
        if (!paginationObj) {
            return null;
        }

        const pglist = []
        let selected = '';
        var j = 1;
        for (var i = 1; i <= paginationObj.total_pages; i++) {
            selected = 'page-item';
            if (paginationObj.page == i) {
                selected = 'page-item active';
            }
            const s = i;
            pglist.push(<li className={selected} key={i}><a className="page-link" data={i} onClick={(i) => this.getNextPage(s)}>{i}</a></li>)

        }

        return (
            <PageErrBoundary>
                <React.Fragment>
                    <Container>
                        {/* <Row> */}
                        <Col></Col>
                        <Col xs={6} md={6} lg={6}>
                            {this.props.loading && <div>Loading....</div>}
                            <NavLink className="btn btn-primary btnSpace" to={router.CREATE_PAGE}>Create</NavLink>
                            
                           
                            <input type="text" name="searchText" className="form-control smallText" placeholder="Search..." onChange={event => {this.onChangeSearch(event)}} value={searchText}></input>
                            <button onClick={event=>this.onSeach(event)} className="btn btn-primary">Search</button>
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
                                                    <button className="btn btn-primary btnSpace" onClick={event => this.edit(event, key)}> Edit </button>
                                                    <button className="btn btn-primary btnSpace" onClick={event => this.delete(event, key.uid)}> Delete </button>
                                                    <Link className="btn btn-primary btnSpace" to={`${router.PREVIEW}/${key.title}`}> Preview </Link>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </Col>
                        <Col></Col>
                        
                        <br/>
                        <br/>
                        <div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    {pglist}
                                </ul>
                            </nav>
                        </div>
                    </Container>

                </React.Fragment>
            </PageErrBoundary>
        );
    }
}



const mapStateToProps = (state) => ({
    loading: state.loading,
    pages: Object.keys(state.pageSession.pages || {}).map(
        key => ({
            ...state.pageSession.pages[key],
            uid: key,
        }),
    ),
})

const mapDispatchToProps = dispatch => ({
    applySetPage: page =>
        dispatch({ type: 'EDIT_PAGE', page }),
    applySetPages: pages =>
        dispatch({ type: 'PAGES_SET', pages })
});

export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps))(Pages);