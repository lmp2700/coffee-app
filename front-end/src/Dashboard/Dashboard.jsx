import React, { Component } from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';

export default class Dashboard extends Component{
    render(){
        return(
            <div>
                <NavbarComponent />
                <h2>This is the dashboard</h2>
            </div>
        )
    }
}