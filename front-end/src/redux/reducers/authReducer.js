const initialState = {
    loggedIn: false,
    registerError: null,
    currentUser: {
        displayName: '',
        username: '',
        _id: '',
        friends: [],
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return initialState;
        case 'REGISTER':
            return {
                ...state,
                loggedIn: true,
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
        default:
            return state;
    }
};

export default authReducer;