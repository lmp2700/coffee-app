import React , { Component } from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

class RoasterSearchResults extends Component{
    render(){
        const results = this.props.results.map((roaster)=>{
           return( <div key={roaster._id}>
                <Link to={`/roasters/${roaster._id}`}><h2>{roaster.name}</h2></Link>
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

export default connect(mapStateToProps)(RoasterSearchResults);