import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sass/style.css";

const users = [
  { email: "user1@example.com", password: "password1", bookId: "4164" },
  { email: "user2@example.com", password: "password2", bookId: "2512" }
];

const Login = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
  
    const handleLogin = () => {
      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (user) {
        setUser({ email: user.email, bookId: user.bookId });
        navigate("/mood-selection");
      } else {
        setError("Invalid email or password");
      }
    };
  
    return (
        <div className="login-container">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button onClick={handleLogin}>Login</button>
        </div>
      );
};
  
export default Login;