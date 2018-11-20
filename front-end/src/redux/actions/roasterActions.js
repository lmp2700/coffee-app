import { LOAD_ROASTERS } from './actionTypes';

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