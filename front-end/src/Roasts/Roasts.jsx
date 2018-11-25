import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewRoastReview from './NewRoastReview/NewRoastReview';
import RoastIndex from './RoastIndex/RoastIndex';
import NewRoast from './NewRoast/NewRoast';
import ShowRoast from './ShowRoast/ShowRoast';


export default class Roasts extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/roasts" component={RoastIndex} />
                    <Route exact path="/roasts/new" component={NewRoast} />
                    <Route path="/roasts/reviews/new" component={NewRoastReview} />
                    <Route exact path="/roasts/:id" component={ShowRoast} />
                </Switch>
            </div>
        )
    }
}