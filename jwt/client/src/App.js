import "./App.css";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const API = "http://localhost:5000";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // REGISTER
  const register = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("All fields are required");
      return;
    }

    await axios.post(`${API}/register`, form);
    setIsLogin(true);
    setForm({ name: "", email: "", password: "" });
  };

  // LOGIN
  const login = async () => {
    const res = await axios.post(`${API}/login`, {
      email: form.email,
      password: form.password,
    });

    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
  };

  // GOOGLE LOGIN
  const googleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post(`${API}/auth/google`, {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (err) {
      alert("Google sign-in failed");
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  // LOGGED-IN UI
  if (token) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow text-center" style={{ width: "360px" }}>
          <h4 className="mb-3">Welcome! You are logged in</h4>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    );
  }

  // AUTH UI
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="card p-4 shadow" style={{ width: "360px" }}>
          <h4 className="text-center mb-3">
            {isLogin ? "Login" : "Register"}
          </h4>

          {/* NAME (REGISTER ONLY) */}
          {!isLogin && (
            <input
              className="form-control mb-3"
              placeholder="Name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          )}

          {/* EMAIL */}
          <input
            className="form-control mb-3"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* PASSWORD */}
          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* LOGIN / REGISTER BUTTON */}
          {isLogin ? (
            <Button className="w-100 mb-3" onClick={login}>
              Login
            </Button>
          ) : (
            <Button className="w-100 mb-3" variant="success" onClick={register}>
              Register
            </Button>
          )}

          {/* GOOGLE LOGIN ONLY FOR LOGIN MODE */}
          {isLogin && (
            <>
              <div className="text-center text-muted my-2">OR</div>
              <div className="d-flex justify-content-center">
                <GoogleLogin
                  onSuccess={googleLogin}
                  onError={() => alert("Google login failed")}
                  width="300"
                  theme="outline"
                />
              </div>
            </>
          )}

          {/* TOGGLE */}
          <p
            className="text-center mt-3 text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Create an account"
              : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
