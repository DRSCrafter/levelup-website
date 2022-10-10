import httpConnection from "./httpConnection";

export const Logout = () => {
    localStorage.removeItem('token');
    window.location = '/';
}

export const Login = async (e, email, password, setLoading) => {
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
        window.location = '/';
    } catch (ex) {
    }
    setLoading(false);
};