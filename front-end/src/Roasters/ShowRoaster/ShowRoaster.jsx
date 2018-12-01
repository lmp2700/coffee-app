import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadRoaster } from '../../redux/actions/roasterActions';
import { Button } from 'reactstrap'
import './style.css';
import NewRoastModal from './NewRoastModal/NewRoastModal';

class ShowRoaster extends Component{
    componentDidMount(){
        this.props.loadRoaster();
    }
    render(){
        const roasts = this.props.roaster.roasts.map((roast)=>{
            return(
                <div className="roast-in-list" key={roast._id}>
                    <h6>{roast.name}</h6>
                    <Link to={`/roasts/${roast._id}`}>View</Link>
                </div>
            )
        })
        return(
            <div>
                <h1>{this.props.roaster.name}</h1>
                <p>{this.props.roaster.address}</p>
                <NewRoastModal/>
                <h3>Featured roasts</h3>
                {roasts}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        roaster: state.roasters.currentRoaster
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        loadRoaster: () => { loadRoaster(dispatch, ownProps.match.params.id)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ShowRoaster);