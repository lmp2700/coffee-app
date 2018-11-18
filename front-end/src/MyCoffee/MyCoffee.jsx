import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import NewCoffeeReview from './NewCoffeeReview/NewCoffeeReview';


export default class MyCoffee extends Component{
    render(){
        return(
            <div>
                <NavbarComponent/>
                <h2>Here's stuff about your coffees</h2>
                <Switch>
                    <Route path="/coffee/reviews/new" component={NewCoffeeReview} />
                </Switch>
            </div>
        )
    }
}