import { CREATE_ROAST, LOAD_ROAST, CREATE_ROAST_REVIEW, LOAD_ROASTS } from './actionTypes';

export const createRoast = async(dispatch, formData, history) => {
    const newCoffee = await fetch(`${process.env.REACT_APP_API_HOST}/roasts`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        method: "POST"
    })
    const parsedNewCoffee = await newCoffee.json();
    dispatch({
        type: CREATE_ROAST,
        payload: parsedNewCoffee.data
    })
    history.push('/roasts/'+ parsedNewCoffee.data._id)
}

export const loadRoast = async(dispatch, roastId)=>{
    const thisRoast = await fetch(`${process.env.REACT_APP_API_HOST}/roasts/${roastId}`, {
        credentials: 'include'
    })
    const thisRoastParsed = await thisRoast.json();
    dispatch({
        type: LOAD_ROAST,
        payload: thisRoastParsed.data
    })
}

export const createReview = async(dispatch, formData, history) => {
    console.log("CREATING A REVIEW IN ACTIONS");
    const newReview = await fetch(`${process.env.REACT_APP_API_HOST}/roasts/${formData.roastId}/reviews`, {
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const newReviewParsed = await newReview.json();
    console.log(newReviewParsed);
    dispatch({
        type: CREATE_ROAST_REVIEW,
        payload: newReviewParsed.data
    })
}

export const loadRoasts = async (dispatch) => {
    console.log("LOADING ROASTS");
    const roasts = await fetch(`${process.env.REACT_APP_API_HOST}/roasts`, {
        credentials: 'include'
    })
    const roastsParsed = await roasts.json();
    if(roastsParsed.status === 200){
        dispatch({
            type: LOAD_ROASTS,
            payload: roastsParsed.data
        })
    }
} 