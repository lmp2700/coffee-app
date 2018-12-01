import { LOAD_ROASTERS, LOAD_ROASTER, CREATE_ROASTER_REVIEW } from './actionTypes';

export const loadRoasters = async (dispatch) => {
    console.log("LOADING ROASTERS ALREADY");
    const roasters = await fetch(`${process.env.REACT_APP_API_HOST}/roasters`, {
        credentials: 'include'
    })
    const roastersParsed = await roasters.json();
    console.log(roastersParsed);
    if(roastersParsed.status === 200){
        dispatch({
            type: LOAD_ROASTERS,
            payload: roastersParsed.data
        })
    }
}

export const loadRoaster = async(dispatch, roasterId)=>{
    console.log("ACTION LOADING A ROAST");
    console.log(roasterId);
    const thisRoaster = await fetch(`${process.env.REACT_APP_API_HOST}/roasters/${roasterId}`, {
        credentials: 'include'
    })
    const thisRoasterParsed = await thisRoaster.json();
    console.log(thisRoasterParsed);
    dispatch({
        type: LOAD_ROASTER,
        payload: thisRoasterParsed.data
    })
}

export const createReview = async(dispatch, formData, history) => {
    console.log("CREATING A REVIEW IN ACTIONS");
    const newReview = await fetch(`${process.env.REACT_APP_API_HOST}/roasters/${formData.roaster}/reviews`, {
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const newReviewParsed = await newReview.json();
    console.log(newReviewParsed);
    if(newReviewParsed.status === 200){
        dispatch({
            type: CREATE_ROASTER_REVIEW,
            payload: newReviewParsed.data
        })
        //only needs to redirect if not already on roaster page
        //calls from the roaster page will not include history
        if(history){
            history.push(`/roasters/${formData.roaster}`)
        }
    }
}