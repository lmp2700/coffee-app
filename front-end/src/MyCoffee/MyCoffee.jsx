import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NewCoffeeReview from './NewCoffeeReview/NewCoffeeReview';
import CoffeeIndex from './CoffeeIndex/CoffeeIndex';
import NewCoffee from './NewCoffee/NewCoffee';
import ShowRoast from './ShowRoast/ShowRoast';


export default class MyCoffee extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path="/coffee" component={CoffeeIndex} />
                    <Route exact path="/coffee/new" component={NewCoffee} />
                    <Route path="/coffee/reviews/new" component={NewCoffeeReview} />
                    <Route exact path="/coffee/:id" component={ShowRoast} />
                </Switch>
            </div>
        )
    }
}