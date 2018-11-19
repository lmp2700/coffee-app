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
                ...state,
                generalResults: action.payload
            }
        case 'ROAST_SEARCH':
            return{
                ...state,
                roastResults: action.payload
            }
        default:
            return state;
    }
}

export default searchReducer;