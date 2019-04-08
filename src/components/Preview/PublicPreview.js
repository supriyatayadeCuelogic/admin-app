import React from 'react';
import { withFirebase } from './../Firebase';
import ReactHtmlParser from 'react-html-parser';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { compose } from 'recompose';

class PublicPreview extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: [],
            loading: null,
            pageId: null
        }
    }
    componentDidUpdate(prevProps) {
        const id = this.props.match.params.id;
        if (this.state.pageId !== id) {
            this.fetchData()
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const id = this.props.match.params.id;

        this.setState({ pageId: id, loading: true });
        this.props.firebase.pages().orderByChild('title').equalTo(id).on('value', snapshot => {
            const pagesObject = snapshot.val();
            if (pagesObject) {
                const pagesList = Object.keys(pagesObject).map(key => ({
                    ...pagesObject[key],
                    uid: key,
                }));

                this.setState({
                    page: pagesList[0],
                    loading: false,
                });

                this.props.applySetPublicPagePreview(this.state.page);
                this.props.applySetLoading(false);
            } else {
                this.setState({ page: null, loading: false });
            }
        });
    }

    render() {
        const page = this.props.publicPreview;
        if (!page) {
            return null;
        }

        const { loading } = this.state;

        return (
            // <AuthUserContext.Consumer>
            //     {authUser => (
            //         authUser === null ? this.props.history.push(routes.LOG_IN) :
            <React.Fragment>
                <Container>
                    <Row>
                        <Col></Col>
                        <Col>
                            {loading && <div>Loading....</div>}
                            {ReactHtmlParser(page.content)}
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </React.Fragment>
            //     )}
            // </AuthUserContext.Consumer>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.pageSession.loading,
    publicPreview: state.pageSession.publicPreview
})

const mapDispatchToProps = dispatch => ({
    applySetPublicPagePreview: page =>
        dispatch({ type: 'SET_PUBLIC_PREVIEW', page }),
    applySetLoading: loading =>
        dispatch({ type: 'SET_LOADING', loading })
});


export default compose(withFirebase, withRouter,
    connect(mapStateToProps, mapDispatchToProps))(PublicPreview);