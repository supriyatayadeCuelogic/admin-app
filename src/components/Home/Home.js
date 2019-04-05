import React, { Component } from 'react';
import { withFirebase } from './../Firebase';
import { connect } from 'react-redux';
import Pages from './../Pages';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as router from './../../constants/routes';
import { withAuthorization } from './../Auth';
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


    componentDidMount() {
        if (!this.props.pages) {
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
        // debugger;
        const { pages, loading } = this.state;
        console.log("home",this.props);
        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    authUser === null ? this.props.history.push(router.LOG_IN) :            
                        <React.Fragment>
                            <Pages data={pages} loading={loading} />
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