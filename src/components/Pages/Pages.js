import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import * as router from './../../constants/routes';
import { withFirebase } from './../Firebase';
import { BootstrapTable, TableHeaderColumn, InsertButton } from 'react-bootstrap-table';
// import './../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';



class Pages extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            list: []
        }
        console.log(props);
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

    edit = (event, post) => {
        this.props.editPage(post.uid);
        this.props.history.push(router.EDIT_PAGE + '/' + post.uid);
    }

    delete = (event,id) => {
        let res = window.confirm("Are you sure you want to delete this?");
        if (res == true) {
            this.props.firebase.page(id).remove();
        }
    };

    render() {
        // console.log(this.props.data);
        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {this.props.loading && <div>Loading....</div>}

                            <table id="table"
                                data-toggle="table"
                                data-search="true"
                                data-filter-control="true"
                                data-show-export="true"
                                data-click-to-select="true"
                                data-toolbar="#toolbar"
                                className="table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th data-field="prenom" data-filter-control="input" data-sortable="true">Title</th>
                                        <th data-field="date" data-filter-control="select" data-sortable="true">Content</th>
                                        <th data-field="examen" data-filter-control="select" data-sortable="true">Status</th>
                                        <th data-field="note" data-sortable="true">Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        this.props.data.map(key => (
                                            <tr key={key.uid}>
                                                <td>{key.title}</td>
                                                <td><pre>{key.content}</pre></td>
                                                <td>{key.status}</td>
                                                <td><button className="btn btn-primary" onClick={event => this.edit(event, key)}> Edit </button>
                                                    <button className="btn btn-primary" onClick={event => this.delete(event,key.uid)}> Delete </button></td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>



                            {/* <ul>
                        {
                            this.props.data.map(key => (
                                <li key={key.uid}>{key.title}
                                    <button onClick={event => this.edit(event, key)}> Edit </button>
                                    <button onClick={this.delete}> Delete </button>
                                </li>
                            ))
                        }
                    </ul> */}


                            {/* <BootstrapTable data={this.props.data} striped hover options={this.options} insertRow>
                        <TableHeaderColumn dataSort={true} isKey dataField='title'>Title</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='content'>Content</TableHeaderColumn>
                        <TableHeaderColumn dataSort={true} dataField='status'>Status</TableHeaderColumn>
                        <TableHeaderColumn dataField='action' export={ false }>Action</TableHeaderColumn>
                    </BootstrapTable> */}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}



const mapStateToProps = (state) => ({
    loading: state.loading
})

const mapDispatchToProps = dispatch => ({
    editPage: page =>
        dispatch({ type: 'EDIT_PAGE', id: page.uid })
});

export default compose(
    withRouter,
    withFirebase,
    connect(mapStateToProps, mapDispatchToProps))
    (Pages);