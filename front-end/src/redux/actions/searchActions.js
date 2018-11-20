import { SEARCH_ROASTERS } from './actionTypes';

export const searchRoasters = async(dispatch, formData) => {
    console.log(formData);
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/roasters/search?location=denver&query=${formData.query}`, {
        credentials: 'include',
    });
    console.log(response);
    const parsed = await response.json();
    if(parsed.status === 200){
        dispatch({
            type: SEARCH_ROASTERS,
            payload: parsed.data
        })
    }
}