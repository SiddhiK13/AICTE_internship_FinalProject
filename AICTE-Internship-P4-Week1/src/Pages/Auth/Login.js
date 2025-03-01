import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginAPI } from "../../utils/ApiRequest";
import "./auth.css"; 

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ email: "", password: "" });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/"); 
    }
  }, [navigate]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { email, password } = values;
      const { data } = await axios.post(loginAPI, { email, password });

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        navigate("/"); 
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Login failed. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <Container className="auth-container">
        <Row>
          <Col>
            <h1 className="text-center mt-3">
              <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "white" }} />
            </h1>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label className="text-white">Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="Enter email" 
                  name="email" 
                  onChange={handleChange} 
                  value={values.email} 
                  required 
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword" className="mt-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control 
                  type="password" 
                  name="password" 
                  placeholder="Password" 
                  onChange={handleChange} 
                  value={values.password} 
                  required 
                />
              </Form.Group>

              <div className="mt-4 d-flex flex-column align-items-center">
                <Link to="/forgotPassword" className="text-white">Forgot Password?</Link>

                <Button type="submit" className="mt-3 btnStyle" disabled={loading}>
                  {loading ? "Signing in…" : "Login"}
                </Button>

                <p className="mt-3" style={{ color: "#ddd" }}>
                  Don't have an account? <Link to="/register" className="text-white">Register</Link>
                </p>
              </div>
            </Form>
          </Col>
        </Row>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Login;
