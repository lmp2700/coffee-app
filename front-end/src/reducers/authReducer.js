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
        default:
            return state;
    }
};

export default authReducer;