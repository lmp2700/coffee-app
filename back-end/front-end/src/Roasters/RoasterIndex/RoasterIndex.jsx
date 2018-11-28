import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRoasters } from '../../redux/actions/roasterActions';
import { searchRoasters } from '../../redux/actions/searchActions';
import RoasterSearch from './RoasterSearch/RoasterSearch';

class RoasterIndex extends Component{
    componentDidMount(){
        this.props.loadRoasters()
    }
    render(){
        const roasters = this.props.roasters.map((roaster)=>{
            return(
                <div key={roaster._id}>
                    <Link to={`/roasters/${roaster._id}`}><h3>{roaster.name}</h3></Link>
                </div>
            )
        })
        const searchResults = this.props.roasterSearchResults.map((searchResult)=>{
            return(
                <Row key={searchResult._id}>
                    <Link to={`/roasters/${searchResult._id}`}><h3>{searchResult.name}</h3></Link>
                </Row>
            )
        })
        return(
            <Row>
                <Col sm={3}>
                    <h3>Top roasters</h3>
                    {roasters}
                </Col>
                <Col sm={9}>
                    <RoasterSearch/>
                    {searchResults}
                </Col>
            </Row>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        roasters: state.roasters.roasters,
        roasterSearchResults: state.search.roasterResults
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        loadRoasters: ()=>{ loadRoasters(dispatch) },
        searchRoasters: (query) => { searchRoasters(dispatch, query)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoasterIndex);