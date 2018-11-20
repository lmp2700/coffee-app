const initialState = {
    currentRoast: {
        "name": null,
        "origin": null,
        "color": null,
        "roaster": {
            "name": null,
            "_id": null
        }
    }
}

const roastReducer = (state=initialState, action) => {
    switch(action.type){
        case "LOAD_ROAST":
            return{
                ...state,
                currentRoast: action.payload
            }
        default:
            return state;
    }
}

export default roastReducer;