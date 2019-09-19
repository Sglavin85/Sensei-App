const url = "https://localhost:44369/api/dependents"

const API = {
    getAllDependents: function(token) {
        return fetch(`${url}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => response.json())
    },
    editDependent: function(dependent, tokenObj) {
        return fetch(`${url}/${dependent.Id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": `Bearer ${tokenObj.token}`
            },
            body: JSON.stringify(dependent)
        })
    },
    deleteDependent: function(dependentId, tokenObj) {
        return fetch(`${url}/${dependentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": `Bearer ${tokenObj.token}`
            }
        })
        .then(response => response.json())
    },
    addDependent: function(dependent, tokenObj) {
        return fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": `Bearer ${tokenObj.token}`
            },
            body: JSON.stringify(dependent)
        })
        .then(response => response.json())
    },
    addFavorite: function(gameId, Id, tokenObj) {
        const favGameObj = {gameID: gameId, dependentId: Id}
        return fetch(`${url}/favorite`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": `Bearer ${tokenObj.token}`
            },
            body: JSON.stringify(favGameObj)
        })
        .then(response => response.json())
    },
    deleteFavorite: function(gameId, tokenObj) {
        return fetch(`${url}/favorite/${gameId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": `Bearer ${tokenObj.token}`
            }
        })
        .then(response => response.json())
    }
}

export default API;