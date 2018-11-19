import { LOGOUT, REGISTER, REGISTER_FAILURE } from './actionTypes';

export const register = async (dispatch, formData, history) => {
    console.log(formData);
    console.log("REGISTERING FROM ACTIONS");
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/auth/register`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await response.json();
    console.log(parsedResponse);
    if(parsedResponse.status === 200){
        dispatch({
            type: REGISTER,
            payload: parsedResponse.data.user
        })
        history.push("/");
    }else{
        dispatch({
            type: REGISTER_FAILURE,
            payload: parsedResponse.data
        })
        console.log("THE SERVER DOESNT LIKE IT")
    }

}

export const login = async (dispatch, formData, history) => {
    const validLogin = await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/auth/login`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(formData),
        headers:{
          'Content-Type': 'application/json'
        }
    })
    const parsedResponse = await validLogin.json()
    if(parsedResponse.status === 200){
        dispatch({
            type: "LOGIN",
            payload: parsedResponse.data.user
        })
        history.push("/")
    } else {
        return false;
    }
}
export const googleLogin = async(dispatch, data) => {
    console.log("GOOGLE LOGIN COMING IN")
}
export const logout = async (dispatch, history) => {
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/auth/logout`, {
      method: "POST",
      credentials: "include"
    })
    console.log(response);
    dispatch({
        type: LOGOUT
    })
    history.push("/")
}