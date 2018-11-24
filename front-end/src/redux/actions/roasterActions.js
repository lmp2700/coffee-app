import { LOAD_ROASTERS, LOAD_ROASTER } from './actionTypes';

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