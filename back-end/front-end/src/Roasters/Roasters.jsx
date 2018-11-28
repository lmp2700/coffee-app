import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShowRoaster from './ShowRoaster/ShowRoaster';
import RoasterIndex from './RoasterIndex/RoasterIndex';

class Roasters extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/roasters/:id" component={ShowRoaster}></Route>
                <Route exact path="/roasters/" component={RoasterIndex}></Route>
            </Switch>
        )
    }
}

export default Roasters;