const initialState = {
    apiDogs: [],
    apiDog_Detail: [],
    dbDogs: [],
    dbDog_Detail: [],
};

function rootReducer(state = initialState, action){
    if(action.type === "GET_DOGS"){
        return{
            ...state,
            apiDogs: action.payload
        }
    }

    if(action.type === "GET_DOGS_BY_BREED"){
        return{
            ...state,
            apiDogs: action.payload
        }
    }

    if(action.type === "GET_BDDOGS"){
        return{
            ...state,
            dbDogs: action.payload
        }
    }

    if(action.type === "GET_BDDOGS_BY_BREED"){
        return{
            ...state,
            dbDog_Detail: action.payload
        }
    }
}

export default rootReducer;