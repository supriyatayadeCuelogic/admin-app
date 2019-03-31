import React ,{Component} from 'react';
import { withFirebase } from './../Firebase';

class Home extends Component{

    constructor(props){
        super(props);

        this.state={
            loading:false,
            pages:[],
            limit:10
        }
    }


    componentDidMount(){
        if(!this.props.pages){
            this.setState({loading:true});
        }

        this.getPages();
    }

    getPages = () => {
        this.setState({loading:true});

        this.props.firebase.pages().limitToLast(this.state.limit).on(
            'value',snapshot=>{
                
                const pagesObj = snapshot.val();
                if(pagesObj){
                    const pagesList = Object.keys(pagesObj).map(key => ({
                        ...pagesObj[key],
                        uid:key
                    }));
                    this.setState({loading:false,pages:pagesList})
                }else{
                    this.setState({loading:false,pages:null})
                }
                
            }
        )
    }

    render(){
        const{pages,loading} = this.state;
        return (
            <React.Fragment>
                {loading && <div>Loading....</div>}
                <ul>
                {
                    pages.map(key=>(
                        <li key={key}>{key.title}</li>
                    ))
                }
                </ul>
            </React.Fragment>
        );
    }
}

export default withFirebase(Home);