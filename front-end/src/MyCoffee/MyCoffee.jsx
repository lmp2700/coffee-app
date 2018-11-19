import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewCoffeeReview from './NewCoffeeReview/NewCoffeeReview';


export default class MyCoffee extends Component{
    render(){
        return(
            <div>
                <h2>Here's stuff about your coffees</h2>
                <Switch>
                    <Route path="/coffee/reviews/new" component={NewCoffeeReview} />
                </Switch>
            </div>
        )
    }
}