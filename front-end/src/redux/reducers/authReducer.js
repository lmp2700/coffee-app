const initialState = {
    loggedIn: false,
    registerError: null,
    currentUser: {
        displayName: '',
        username: '',
        _id: '',
        friends: [],
        profile: {}
    },
    friendRequestsYouHaveMade: [],
    friendRequestsForYou: []
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return initialState;
        case 'REGISTER':
            return {
                ...state,
                loggedIn: true,
                registerError: null,
                currentUser: action.payload
            }
        case 'REGISTER_FAILURE':
            return {
                ...state,
                registerError: action.payload
            }
        case 'LOGIN':
            return{
                ...state,
                loggedIn: true,
                loginError: null,
                currentUser: action.payload
            }
        case 'LOGIN_FAILURE':
            return{
                ...initialState
            }
        case 'SET_USER':
            return{
                ...state,
                loggedIn: true,
                currentUser: action.payload
            }
        case 'UPDATE_USER':
            return{
                ...state,
                currentUser: action.payload
            }
        case 'CREATE_FRIEND_REQUEST':
            return{
                ...state,
                friendRequestsYouHaveMade: [...state.friendRequestsYouHaveMade, action.payload]
            }
        case 'LOAD_FRIEND_REQUESTS':
            return{
                ...state,
                friendRequestsForYou: [action.payload.friendRequestsForYou],
                friendRequestsYouHaveMade: [action.payload.friendRequestsYouHaveMade]
            }
        case 'ACCEPT_FRIEND_REQUESTS':
            //add the new person to friends AND
            //remove the friend request from requests you have made
            return{
                ...state
            }
        default:
            return state;
    }
};

export default authReducer;