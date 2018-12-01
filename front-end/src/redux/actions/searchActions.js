import { SEARCH_ROASTERS, SEARCH_USERS, SEARCH_ROASTS, CLEAR_SEARCH_RESULTS } from './actionTypes';

export const searchRoasters = async(dispatch, formData, history) => {
    console.log(formData);
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/roasters/search?location=${formData.location}&query=${formData.query}`, {
        credentials: 'include',
    });
    const parsed = await response.json();
    if(parsed.status === 200){
        dispatch({
            type: SEARCH_ROASTERS,
            payload: parsed.data
        })
        if(history){
            history.push(`/search/roasters/results?query=${formData.query}&location=denver`);
        }
    }
}

export const searchUsers = async(dispatch, query) => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/users/search?query=${query}`, {
        credentials: 'include'
    })
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    if(parsedResponse.status === 200){
        dispatch({
            type: SEARCH_USERS,
            payload: parsedResponse.data
        })
    }
}

export const searchRoasts = async(dispatch, formData) => {
    console.log("searching ROASTS");
    console.log(formData)
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/roasts/search?query=${formData.query}`, {
        credentials: 'include'
    })
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    if(parsedResponse.status === 200){
        dispatch({
            type: SEARCH_ROASTS,
            payload: parsedResponse.data
        })
    }
}

export const clearSearchResults = (dispatch) => {
    dispatch({
        type: CLEAR_SEARCH_RESULTS
    })
}