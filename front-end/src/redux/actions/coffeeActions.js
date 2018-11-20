import { CREATE_COFFEE } from './actionTypes';

export const createCoffee = async(dispatch, formData, history) => {
    console.log(formData);
    const newCoffee = await fetch(`${process.env.REACT_APP_API_HOST}/coffee`, {
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
        type: CREATE_COFFEE,
        payload: parsedNewCoffee.data
    })
    history.push('/coffee/'+ parsedNewCoffee.data._id)
}