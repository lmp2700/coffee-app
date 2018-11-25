import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import EditProfileForm from './EditProfileForm/EditProfileForm';

class Profile extends Component {
    render(){
        return(
            <div>
                <Row>
                    <Col sm={6} className="offset-sm-3">
                    <h2>{this.props.currentUser.displayName} from {this.props.currentUser.profile.location}</h2>
                    { this.props.currentUser.profile.set ? 
                    <div> 
                        <h4>Roast color preference: {this.props.currentUser.profile.roastColorPreference}</h4>
                        <EditProfileForm modalTitle="Update your profile"/>
                    </div>
                    :
                    <div>
                    <EditProfileForm modalTitle="Set your profile"/>
                    </div>}
                    </Col>
                </Row>
                <p>{JSON.stringify(this.props.currentUser)}</p>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        currentUser: state.auth.currentUser
    }
}
const mapDispatchToProps = (dispatch) => {
    return{

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);