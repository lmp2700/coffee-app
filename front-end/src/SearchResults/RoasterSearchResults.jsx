import React , { Component } from 'react';
import {connect} from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

class RoasterSearchResults extends Component{
    componentDidMount(){
        console.log(this.props)
        //props.location.search is the query params from the route
        if(this.props.location.search){
            //TODO: If there are query params, they must be reloading or clicking a link
            // Either way, do a search so you can have search results automatically
            console.log("query params present")
        }
    }
    render(){
        const results = this.props.results.map((roaster)=>{
           return( <div key={roaster._id}>
                <Link to={`/roasters/${roaster._id}`}><h2>{roaster.name}</h2></Link>
                <p>{roaster.address}</p>
            </div>)
        })
        return(
            <div>
                <h1>Here are your search results</h1>
                {results}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        results: state.search.roasterResults
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoasterSearchResults));