export function getDogs(){
    return function(dispatch){
        return fetch(`https://api.thedogapi.com/v1/breeds`)
        .then(response => response.json())
        .then(json => {
            dispatch({ type: "GET_DOGS", payload: json})
        })
    }
}

/*export function getDogsByBreed(breed){
    return function(dispatch){
        return fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breed}`)
        .then(response => response.json())
        .then(json => {
            dispatch({ type: "GET_DOGS_BY_BREED", payload: json})
        })
    }
}*/

export function getBDDogs(){
    return function(dispatch){
        return fetch(`http://localhost:3001/dogs`)
        .then(response => response.json())
        .then(json => {
            dispatch({ type: "GET_BDDOGS", payload: json })
        })
    }
}

/*export function getDBDogsByBreed(breed){
    return function(dispatch){
        return fetch(`http://localhost:3001/pokemons`)
        .then(response => response.json())
        .then(json => {
            dispatch({ type: "GET_BDDOGS_BY_BREED", payload: json })
        })
    }
}*/
