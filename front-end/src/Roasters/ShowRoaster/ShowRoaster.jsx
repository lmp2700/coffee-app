import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadRoaster } from '../../redux/actions/roasterActions';

class ShowRoaster extends Component{
    componentDidMount(){
        this.props.loadRoaster();
    }
    render(){
        const roasts = this.props.roaster.roasts.map((roast)=>{
            return(
                <div key={roast._id}>
                    <h6>{roast.name}</h6>
                </div>
            )
        })
        return(
            <div>
                <h1>{this.props.roaster.name}</h1>
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