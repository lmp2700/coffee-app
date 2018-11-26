import { SEARCH_ROASTERS, SEARCH_USERS } from './actionTypes';

export const searchRoasters = async(dispatch, formData, history) => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/roasters/search?location=denver&query=${formData.query}`, {
        credentials: 'include',
    });
    const parsed = await response.json();
    if(parsed.status === 200){
        console.log(parsed);
        dispatch({
            type: SEARCH_ROASTERS,
            payload: parsed.data
        })
        history.push(`/search/roasters/results?query=${formData.query}&location=denver`);
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