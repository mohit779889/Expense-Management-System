// LoginPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Footer } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";
import "./auth.css";
const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

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
    const { email, password } = values;

    try {
      setLoading(true); // Start loading before the API request
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
        // Other configurations like timeout, responseType, etc., can be added here
      };
      const { data } = await axios.post(loginAPI, {
        email: email,
        password: password
      }, config);
  
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user)); // Store user data in local storage
        navigate("/"); // Navigate to the home page after successful login
        toast.success(data.message, toastOptions); // Show success message
      } else {
        toast.error(data.message, toastOptions); // Show error message from server
      }
    } catch (error) {
      console.error("Login failed:", error); // Log the error for debugging purposes
      toast.error("An error occurred during login.", toastOptions); // Show generic error message to the user
    } finally {
      setLoading(false); // Stop loading irrespective of the result
    }
  };


  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#000",
            },
          },
          fpsLimit: 60,
          particles: {
            number: {
              value: 200,
              density: {
                enable: true,
                value_area: 800,
              },
            },
            color: {
              value: "#ffcc00",
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: 0.5,
              random: true,
            },
            size: {
              value: 3,
              random: { enable: true, minimumValue: 1 },
            },
            links: {
              enable: false,
            },
            move: {
              enable: true,
              speed: 2,
            },
            life: {
              duration: {
                sync: false,
                value: 3,
              },
              count: 0,
              delay: {
                random: {
                  enable: true,
                  minimumValue: 0.5,
                },
                value: 1,
              },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: -1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <Container
        className="mt-5"
        style={{ position: "relative", zIndex: "2 !important" }}
      >
        <Row>
          <h1 className="text-center">
            <AccountBalanceWalletIcon
              sx={{ fontSize: 40, color: "white" }}
              className="text-center"
            />
          </h1><h1></h1>
          <h1 className="text-center text-white">Welcome to Expense Management System</h1>
          <Col xs={12} sm={10} md={8} lg={6} className="mx-auto">
            <div className="form-container">
              <h2 className="text-white text-center">Login</h2>
              <Form className="form">
                <Form.Group controlId="formBasicEmail" className="mt-3">
                  <Form.Label className="text-white ">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
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
                  />
                </Form.Group>

                <div className="button-container mt-3">

                  <Button
                    type="submit"
                    className="mt-3 btnStyle btn"
                    onClick={!loading ? handleSubmit : null}
                    disabled={loading}
                  >
                    {loading ? "Signing in…" : "Login"}
                  </Button>

                  <p >
                    Don't Have an Account?{" "}
                    <Link to="/register" className="text-white">
                      Register
                    </Link>
                  </p>
                </div>
              </Form>
            </div>
          </Col>

        </Row>
        <ToastContainer />

      </Container>
    </div>
  );
};

export default Login;
