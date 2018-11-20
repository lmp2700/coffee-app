import React, { Component } from 'react';

const ShowCoffee = (props) => {
    return(
        <div>
            <h1>{JSON.stringify(props.coffee)}</h1>
        </div>
    )
}

export default ShowCoffee