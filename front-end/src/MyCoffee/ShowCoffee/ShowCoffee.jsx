import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { loadRoast } from '../../redux/actions/roastActions';

class ShowCoffee extends Component{
    componentDidMount(){
        this.props.loadRoast();
    }
    render(){
        return(
            <div>
                <h1>heres your roast</h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        roast: state.roasts.currentRoast
    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        loadRoast: () => { loadRoast(dispatch, ownProps.match.params.id)}
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowCoffee));