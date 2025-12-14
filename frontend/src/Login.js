import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


export default function Login() {
const [data, setData] = useState({ usernameOrEmail: "", password: "" });
const [showPassword, setShowPassword] = useState(false);


const submit = async () => {
if (!data.usernameOrEmail || !data.password) {
alert("Please fill all fields");
return;
}
try {
const res = await axios.post("http://localhost:5000/api/auth/login", data);
alert(res.data.message);
} catch (err) {
alert(err.response?.data?.error || "Login failed");
}
};


return (
<div className="card">
<h2>Login</h2>


<input
placeholder="Username or Email"
onChange={e => setData({ ...data, usernameOrEmail: e.target.value })}
/>


<div className="password-wrapper">
<input
type={showPassword ? "text" : "password"}
placeholder="Password"
onChange={e => setData({ ...data, password: e.target.value })}
/>
<span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
{showPassword ? '🙈' : '👁️'}
</span>
</div>


<button onClick={submit}>Login</button>


<p className="link-text">
Not registered? <Link to="/register">Register here</Link>
</p>
</div>
);
}