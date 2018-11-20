import React, { Component } from 'react';
import { connect } from 'react-redux'

class NewRoaster extends Component{
    constructor(){
        super();
    }

    render(){
        return(
            <div>
                <h1>New roaster</h1>
            </div>  
        )
    }
}

const mapStateToProps = (state) => {
    return{

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(NewRoaster);