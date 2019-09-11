const url = "https://localhost:44369"

const API = {
    login: function(user) {
        return fetch(`${url}/login`, {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
        },
    register: function(user) {
        return fetch(`${url}/register`, {
            method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
                .then(response => response.json())
        }
    }

export default API;