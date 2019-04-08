import React from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import AuthUserContext from './context';

const withUserAuthentication = Component => {
  class WithUserAuthentication extends React.Component {
    constructor(props) {
      super(props);

      // this.props.onSetAuthUser(
      //   JSON.parse(localStorage.getItem('authUser')),
      // );

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }

    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          // this.props.onSetAuthUser(authUser);
          this.setState({authUser});
        },
        () => {
          localStorage.removeItem('authUser');
          // this.props.onSetAuthUser(null);
          this.setState({authUser:null});
        },
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  // const mapDispatchToProps = dispatch => ({
  //   onSetAuthUser: authUser =>
  //     dispatch({ type: 'AUTH_USER_SET', authUser }),
  // });

  return compose(
    withFirebase,
    // connect(
    //   null,
    //   mapDispatchToProps,
    // ),
  )(WithUserAuthentication);
};

export default withUserAuthentication;