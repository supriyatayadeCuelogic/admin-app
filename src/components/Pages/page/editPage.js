import React ,{Component} from 'react';

class editPage extends Component{
    constructor(props){
        super(props);

        this.state={
            loading:true,
            title:'',
            content:'',
            author:'',
            isIndexPage:'',
            status:''
        }
    }

    render(){
        return (
            <React.Fragment>
               edit PAGES
            </React.Fragment>
        );
    }
}

export default editPage;