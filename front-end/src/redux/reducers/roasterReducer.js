const intitialState = {
    roasters: [],
    currentRoaster: {
        name: null,
        _id: null,
        roasts: []
    }
}

const roasterReducer = (state = intitialState, action) => {
    switch(action.type){
        case "LOAD_ROASTERS":
            return{
                ...state,
                roasters: action.payload
            }
        case "LOAD_ROASTER":
            return{
                ...state,
                currentRoaster: action.payload
            }
        default:
            return state
    }
}

export default roasterReducer;