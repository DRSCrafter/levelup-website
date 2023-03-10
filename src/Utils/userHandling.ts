import httpConnection from "./http";
import React from "react";

export const Logout = () => {
    localStorage.removeItem('token');
    (window as Window).location = '/';
}

export const Login = async (e: React.FormEvent, email: string, password: string, setLoading: any) => {
    e.preventDefault();
    setLoading(true);

    const reqBody = JSON.stringify({
        email: email,
        password: password
    })

    try {
        const request = await httpConnection.put('/users/login', reqBody, {
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
        localStorage.setItem("token", request.headers['x-auth-token']);
        (window as Window).location = '/';
    } catch (ex) {
    }
    setLoading(false);
};