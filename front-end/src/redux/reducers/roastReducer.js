const initialState = {
    roasts: [],
    dataLoaded: false,
    currentRoast: {
        "name": null,
        "origin": null,
        "color": null,
        "description": null,
        "roaster": {
            "name": null,
            "_id": null
        },
        "reviews": []
    }
}

const roastReducer = (state=initialState, action) => {
    switch(action.type){
        case "ROAST_LOADING":
            return{
                ...state,
                dataLoaded: false
            }
        case "ROASTS_LOADING":
            return{
                ...state,
                dataLoaded: false
            }
        case "LOAD_ROAST":
            return{
                ...state,
                currentRoast: action.payload,
                dataLoaded: true
            }
        case "LOAD_ROASTS":
            return{
                ...state,
                roasts: action.payload,
                dataLoaded: true
            }
        case "CREATE_ROAST":
            return{
                ...state
            }
        case "CREATE_ROAST_REVIEW":
            return{
                ...state,
                currentRoast: {
                    ...state.currentRoast,
                    reviews: [...state.currentRoast.reviews, action.payload]
                }
            }
        default:
            return state;
    }
}

export default roastReducer;