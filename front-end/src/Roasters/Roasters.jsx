import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ShowRoaster from './ShowRoaster/ShowRoaster';

class Roasters extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/roasters/:id" component={ShowRoaster}></Route>
            </Switch>
        )
    }
}

export default Roasters;