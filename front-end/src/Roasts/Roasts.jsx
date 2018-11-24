import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewCoffeeReview from './NewCoffeeReview/NewCoffeeReview';
import CoffeeIndex from './CoffeeIndex/CoffeeIndex';
import NewCoffee from './NewCoffee/NewCoffee';
import ShowRoast from './ShowRoast/ShowRoast';


export default class Roasts extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/roasts" component={CoffeeIndex} />
                    <Route exact path="/roasts/new" component={NewCoffee} />
                    <Route path="/roasts/reviews/new" component={NewCoffeeReview} />
                    <Route exact path="/roasts/:id" component={ShowRoast} />
                </Switch>
            </div>
        )
    }
}