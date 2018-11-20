import { CREATE_ROAST, LOAD_ROAST } from './actionTypes';

export const createRoast = async(dispatch, formData, history) => {
    console.log(formData);
    const newCoffee = await fetch(`${process.env.REACT_APP_API_HOST}/roasts`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        method: "POST"
    })
    const parsedNewCoffee = await newCoffee.json();
    console.log(parsedNewCoffee);
    dispatch({
        type: CREATE_ROAST,
        payload: parsedNewCoffee.data
    })
    history.push('/coffee/'+ parsedNewCoffee.data._id)
}

export const loadRoast = async(dispatch, roastId)=>{
    console.log("ACTION LOADING A ROAST");
    console.log(roastId);
    const thisRoast = await fetch(`${process.env.REACT_APP_API_HOST}/roasts/${roastId}`, {
        credentials: 'include'
    })
    const thisRoastParsed = await thisRoast.json();
    console.log(thisRoastParsed);
    dispatch({
        type: LOAD_ROAST,
        payload: thisRoastParsed.data
    })
}