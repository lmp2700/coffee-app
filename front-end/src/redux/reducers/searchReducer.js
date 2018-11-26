const initialState = {
    generalResults: [],
    roastResults: [],
    roasterResults: [],
    userResults: []
};

const searchReducer = (state = initialState, action) => {
    switch(action.type){
        case 'GENERAL_SEARCH':
            return{
                //each search should wipe out previous results
                ...initialState,
                generalResults: action.payload
            }
        case 'ROAST_SEARCH':
            return{
                ...initialState,
                roastResults: action.payload
            }
        case 'SEARCH_ROASTERS':
            return{
                ...initialState,
                roasterResults: action.payload
            }
        case 'SEARCH_USERS':
            return{
                ...initialState,
                userResults: action.payload
            }
        default:
            return state;
    }
}

export default searchReducer;