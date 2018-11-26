import { LOAD_FRIEND_REQUESTS, CREATE_FRIEND_REQUEST, ACCEPT_FRIEND_REQUEST, DECLINE_FRIEND_REQUEST } from './actionTypes';

export const loadFriendRequests = async (dispatch) => {
    const friendRequests = await fetch(`${process.env.REACT_APP_API_HOST}/friend-requests`, {
        method: "GET",
        credentials: 'include'
    });
    const parsedRequests = await friendRequests.json();
    dispatch({
        type: LOAD_FRIEND_REQUESTS,
        payload: parsedRequests.data
    })
}
export const acceptFriendRequest = async (dispatch, id) => {
    const friendship = await fetch(`${process.env.REACT_APP_API_HOST}/api/v1/users/${id}/add-friend`, {
        method: "POST",
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const parsed = await friendship.json();
    dispatch({
        type: ACCEPT_FRIEND_REQUEST,
        payload: parsed.data.user
    })
}
export const createFriendRequest = async (dispatch, id) => {
    const friendship = await fetch(`${process.env.REACT_APP_API_HOST}/friend-requests/`, {
        method: "POST",
        credentials: 'include',
        body: JSON.stringify({requestedFriendId: id}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const parsed = await friendship.json();
    if(parsed.status === 200){
        dispatch({
            type: CREATE_FRIEND_REQUEST,
            payload: parsed.data
        })
    }
}