import React ,{Component} from 'react';
import { withRouter } from 'react-router-dom';

import { withFirebase } from './../Firebase';
import * as routes from './../../constants/routes';
import { compose } from 'recompose';
import { AuthUserContext } from './../Auth';


class Login extends Component{
    constructor(props){
        super(props);

        this.state={
            email:'',
            password:'',
            error:null
        }
    }


    onChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    onSubmit = event => {
        const { email, password } = this.state;
    
        this.props.firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ ...this.state });
            
            this.props.history.push(routes.LANDING);
            console.log('props',this.props);
          })
          .catch(error => {
            this.setState({ error });
          });
    
        event.preventDefault();
      };


    render(){
        const {email,password,error} = this.state;
        return (
            <AuthUserContext.Consumer>
                {authUser=>(
                    authUser ? this.props.history.push(routes.LANDING) :
                        <React.Fragment>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group col-md-6">
                                    <h1>Login</h1>
                                    <label>Username</label>
                                    <input name="email" className="form-control" value={email} onChange={this.onChange} type="text" />
                                    
                                    <label>Password</label>
                                    <input name="password" className="form-control" value={password} onChange={this.onChange} type="password" />
                                    <button type="submit" className="btn btn-primary">Login </button>

                                    {error && <p>{error.message}</p>}
                                    </div>
                                </form>
                        </React.Fragment>
                )}
                </AuthUserContext.Consumer>
        );
    }
}

export default compose(withRouter,withFirebase)(Login);