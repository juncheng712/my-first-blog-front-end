import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory()

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        try {
            window.fetch("/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            .then(res => res.json())
            // .then(token => console.log(token))
            .then(data => localStorage.setItem("authToken", data.token))
            .finally(() => history.push('/'))
            
            // history.push("/");
          } catch (error) {
              console.log(error)
            // setError(error.response.data.error);
            // setTimeout(() => {
            //   setError("");
            // }, 5000);
          }
        };

        const handleLogout = () => {
            localStorage.removeItem("authToken")
            history.push("/")
        }
    
    
    return (
        <div className="login">
            {
                !localStorage.getItem("authToken")
                ?
                <form onSubmit={handleLoginSubmit}>
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" onChange={e => setEmail(e.target.value)} />

                    <label htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" onChange={e => setPassword(e.target.value)}/>

                    <button type="submit">Login</button>
                    
                </form>
                :
                null
            }
            {
            localStorage.getItem("authToken")
            ?
            <button onClick={handleLogout}>Logout</button>
            :
            null
            }
        </div>
    )
}

export default Login
