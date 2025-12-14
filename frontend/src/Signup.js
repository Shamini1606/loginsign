// import axios from "axios";
// import { useState } from "react";

// export default function Signup() {
//   const [data, setData] = useState({ name: "", email: "", password: "" });

//   const submit = async () => {
//     await axios.post("http://localhost:5000/api/auth/signup", data);
//     alert("Signup Successful");
//   };

//   return (
//     <div className="card">
//       <h2>Sign Up</h2>
//       <input placeholder="Name" onChange={e => setData({ ...data, name: e.target.value })} />
//       <input placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
//       <input type="password" placeholder="Password" onChange={e => setData({ ...data, password: e.target.value })} />
//       <button onClick={submit}>Register</button>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";export default function Signup() {

    const [data, setData] = useState({
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    
    
    const validatePassword = (pwd) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(pwd);
    };
    
    
    const submit = async () => {
    const { firstName, lastName, phone, email, password, confirmPassword } = data;
    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
    alert("Please fill all fields");
    return;
    }
    if (!/^[\w.-]+@[\w.-]+\.\w{2,4}$/.test(email)) {
    alert("Invalid email format");
    return;
    }
    if (password !== confirmPassword) {
    alert("Passwords do not match");
    return;
    }
    if (!validatePassword(password)) {
    alert("Password must be at least 8 characters long, include uppercase, number, and symbol");
    return;
    }
    
    
    try {
    await axios.post("http://localhost:5000/api/auth/signup", data);
    alert("Registration Successful");
    } catch (err) {
    alert(err.response?.data?.error || "Registration failed");
    }
    };
    
    
    return (
    <div className="card">
    <h2>Register</h2>
    <input placeholder="First Name" onChange={e => setData({ ...data, firstName: e.target.value })} />
    <input placeholder="Last Name" onChange={e => setData({ ...data, lastName: e.target.value })} />
    <input placeholder="Phone Number" onChange={e => setData({ ...data, phone: e.target.value })} />
    <input placeholder="Email" onChange={e => setData({ ...data, email: e.target.value })} />
    
    
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
    
    
    <input
    type={showPassword ? "text" : "password"}
    placeholder="Re-enter Password"
    onChange={e => setData({ ...data, confirmPassword: e.target.value })}
    />
    
    
    <button onClick={submit}>Register</button>
    
    
    <p className="link-text">
    Already registered? <Link to="/">Login here</Link>
    </p>
    </div>
    );
    }