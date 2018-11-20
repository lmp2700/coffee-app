const intitialState = {
    allRoasters: []
}

const roasterReducer = (state = intitialState, action) => {
    switch(action.type){
        case "LOAD_ROASTERS":
            return{
                ...state,
                allRoasters: action.payload
            }
        default:
            return state
    }
}

export default roasterReducer;