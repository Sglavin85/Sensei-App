const url = "https://localhost:44369/dependents"
const getToken = () => {
    let tokenObj = JSON.parse(sessionStorage.getItem("Token"))
    return tokenObj.token
} 

const API = {
    getAllDependents: function() {
        return fetch(`${url}/get`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": getToken()
            }
        })
        .then(response => response.json())
    },
    editDependent: function(dependent) {
        return fetch(`${url}/${dependent.Id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": getToken()
            },
            body: JSON.stringify(dependent)
        })
        .then(response => response.json())
    },
    deleteDependent: function(dependentId) {
        return fetch(`${url}/${dependentId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": getToken()
            }
        })
        .then(response => response.json())
    },
    addDependent: function(dependent) {
        return fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "credentials": "include",
                "Authorization": getToken()
            },
            body: JSON.stringify(dependent)
        })
        .then(response => response.json())
    }
}

export default API;