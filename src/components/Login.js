import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/auth';

const Login = () => {
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let userList = []

            axios.getResource(`Users`).then((users) => {
                userList = users;
                
                userList.forEach(userObject => {
                    if (userObject.username === user && userObject.password === pwd) {
                        const roles = userObject.roles;
                        setAuth({ user, pwd, roles });
                        setUser('');
                        setPwd('');
                        navigate(from, { replace: true });
                    } else {
                        setErrMsg('Invalid username and/or password');
                    }
                });
            })
            
        } catch (err) {
            console.log('Login failed');
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                />
                <button>Sign In</button>
            </form>

            <br/>
            <p>FOR TESTING PURPOSES ONLY:</p>
            <ul>
                <li>Test an admin account with username "admintest" and password "password"</li>
                <li>Test a user account with username "usertest" and password "password"</li>
            </ul>
        </section>

    )
}

export default Login