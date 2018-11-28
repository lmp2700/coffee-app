import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRoasts } from '../../redux/actions/roastActions';
import { searchRoasts } from '../../redux/actions/searchActions';
import RoastSearch from './RoastSearch/RoastSearch';

class RoastIndex extends Component{
    componentDidMount(){
        this.props.loadRoasts()
    }
    render(){
        console.log(this.props.roastSearchResults)
        const roasts = this.props.roasts.map((roast)=>{
            return(
                <div key={roast._id}>
                    <Link to={`/roasts/${roast._id}`}><h3>{roast.name}</h3></Link>
                </div>
            )
        })
        const searchResults = this.props.roastSearchResults.map((searchResult)=>{
            return(
                <Row key={searchResult._id}>
                    <Link to={`/roasts/${searchResult._id}`}><h3>{searchResult.name}</h3></Link>
                </Row>
            )
        })
        console.log(this.props)
        return(
                <Row>
                    <Col sm={3}>
                        <h3>Top roasts</h3>
                        {roasts}
                    </Col>
                    <Col sm={9}>
                        <RoastSearch/>
                        
                        {searchResults}
                    </Col>
                </Row>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        roasts: state.roasts.roasts,
        roastSearchResults: state.search.roastResults
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        loadRoasts: ()=>{ loadRoasts(dispatch) },
        searchRoasts: (query) => { searchRoasts(dispatch, query)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoastIndex);