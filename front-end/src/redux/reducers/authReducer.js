const initialState = {
    loggedIn: false,
    currentUser: {
        displayName: '',
        username: '',
        _id: '',
    }
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return {
                ...state,
                loggedIn: false
            };
        case 'REGISTER':
            console.log(action.payload);
            return {
                ...state,
                loggedIn: true,
                currentUser: action.payload
            }
        case 'LOGIN':
            console.log(action.payload);
            return{
                ...state,
                loggedIn: true,
                currentUser: action.payload
            }
        default:
            return state;
    }
};

export default authReducer;