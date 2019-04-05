import React from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import * as routers from './../../constants/routes';
import Home from './../Home/Home';
import createPage from './../Pages/page/createPage';
import editPage from './../Pages/page/editPage';
import Login from './../Login';
import { AuthUserContext } from './../Auth';
import Logout from './../Logout';
import { withFirebase } from './../Firebase';
import Preview from './../Preview/Preview';
import PublicPreview from './../Preview/PublicPreview';
import NoMatch from './../NoMatch';

const AuthorizedUser = (props) => (

    <AuthUserContext.Consumer>
        {authUser => (
            authUser ?
                <React.Fragment>
                    <LoginUserNav/>
                </React.Fragment>

                :
                <React.Fragment>
                    <ul className="menu">
                        <li><NavLink to={routers.LOG_IN}>Login</NavLink></li>
                        {props.pageList.map(key=>(
                            <li key={key.uid}><NavLink to={`${routers.APP}/${key.title}`}>{key.title}</NavLink></li>
                            
                        ))}                        
                    </ul>
                </React.Fragment>
        )}
    </AuthUserContext.Consumer>
)


const LoginUserNav = () => {
    return (<React.Fragment>
        <ul className="menu">
            <li><NavLink to={routers.LANDING}>Home</NavLink></li>
            {/* <li><NavLink to={`${routers.EDIT_PAGE}/:pageId`}>editPage</NavLink></li> */}
            <li><Logout /></li>
        </ul>
    </React.Fragment> )
}

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageList:[],
            loading:false
        }
    }

    componentDidMount() {
        this.setState({loading:true});
        this.props.firebase.pages()
        .orderByChild('status').equalTo('published')
        .on('value', snapshot => {
            const pagesObject = snapshot.val();

            if (pagesObject) {
                const pagesList = Object.keys(pagesObject).map(key => ({
                    ...pagesObject[key],
                    uid: key,
                }));

                this.setState({
                    pageList: pagesList,
                    loading: false,
                });
            } else {
                this.setState({ pageList: null, loading: false });
            }
        });
    }

    render() {
        return (
            <React.Fragment>
                <AuthorizedUser pageList={this.state.pageList} />
                <Switch>
                    <Route exact path={routers.LANDING} component={Home} />
                    <Route exact path={routers.LOG_IN} component={Login} />
                    <Route exact path={routers.CREATE_PAGE} component={createPage} />
                    <Route exact path={`${routers.EDIT_PAGE}/:id`} component={editPage} />
                    <Route exact path={`${routers.PREVIEW}/:id`} component={Preview} />
                    <Route exact path={`${routers.APP}/:id`} component={PublicPreview} />
                    <Route component={NoMatch} />
                </Switch>
            </React.Fragment>
        )
    }
}

export default withFirebase(Navigation);