import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadRoasts } from '../../redux/actions/roastActions';

class RoastIndex extends Component{
    componentDidMount(){
        this.props.loadRoasts()
    }
    render(){
        const roasts = this.props.roasts.map((roast)=>{
            return(
                <Row key={roast._id}>
                    <Link to={`/roasts/${roast._id}`}><h3>{roast.name}</h3></Link>
                </Row>
            )
        })
        console.log(this.props)
        return(
            <div>
                <Row>
                    <Col sm={6} className="offset-sm-3">
                    {roasts}
                    </Col>
                    
                </Row>
            </div>
            
        )
    }
}
const mapStateToProps = (state) => {
    return{
        roasts: state.roasts.roasts
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        loadRoasts: ()=>{ loadRoasts(dispatch) }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoastIndex);