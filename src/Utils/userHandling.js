import httpConnection from "./httpConnection";
const {apiEndpoint} = require('../config/config.json');

export const Logout = () => {
    localStorage.removeItem('token');
    window.location = '/';
}

export const Login = async (e, email, password) => {
    e.preventDefault();

    const reqBody = JSON.stringify({
        email: email,
        password: password
    })

    try {
        const request = await httpConnection.put(`${apiEndpoint}/api/users/login`, reqBody, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
        localStorage.setItem("token", request.headers['x-auth-token']);
        window.location = '/';
    } catch (ex) {
    }
};