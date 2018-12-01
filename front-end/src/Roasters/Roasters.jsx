import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShowRoaster from './ShowRoaster/ShowRoaster';
import RoasterIndex from './RoasterIndex/RoasterIndex';
import NewRoasterReview from './NewRoasterReview/NewRoasterReview';
import NewRoaster from './NewRoaster/NewRoaster';

class Roasters extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/roasters/" component={RoasterIndex}></Route>
                <Route exact path="/roasters/new" component={NewRoaster}></Route>
                <Route exact path="/roasters/:id" component={ShowRoaster}></Route>
                <Route exact path="/roasters/reviews/new" component={NewRoasterReview}></Route>
            </Switch>
        )
    }
}

export default Roasters;