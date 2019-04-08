import React, { Component } from 'react';
import { withFirebase } from './../Firebase';
import { connect } from 'react-redux';
import Pages from './../Pages';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as router from './../../constants/routes';

import { AuthUserContext } from './../Auth';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            pages: [],
            limit: 10
        }
    }
    
    render() {
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    authUser === null ? this.props.history.push(router.LOG_IN) :            
                        <React.Fragment>
                            <Pages />
                        </React.Fragment>

                )}
            </AuthUserContext.Consumer>
        );
    }


}

const mapStateToProps = (state) => ({
    authUser:state.userSession.authUser
})

export default compose(withFirebase,
    withRouter, connect(mapStateToProps)
    )(Home);