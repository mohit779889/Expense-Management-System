// NavbarComponent.js
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button, Image } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import img from "./cat.png"
const Header = () => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleShowLogin = () => {
    navigate("/login");
  }

  const [user, setUser] = useState();

  useEffect(() => {

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));

      setUser(user);

    }



  }, []);

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);

  return (
    <>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: '#000',
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
                value: '#ffcc00',
              },
              shape: {
                type: 'circle',
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
            position: 'absolute',
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <Navbar className="navbarCSS" collapseOnSelect expand="lg" style={{ position: 'relative', zIndex: "2 !important" }}>

          <Navbar.Brand href="/" className="text-white navTitle">Expense Management System</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
          >
          </Navbar.Toggle>
          <div>
            <Navbar id="responsive-navbar-nav" style={{ color: "white" }}>
              {user ? (
                <>
                  <div className="dropdown ">
                    {user.avatarImage && (


                      <Image src={img} roundedCircle style={{ width: '60px', height: '50px', marginRight: '30px' }} alt={user.name} />
                    )}
                    <Button variant="primary" onClick={handleShowLogout} className="ml-2">Logout</Button>
                  </div >


                </>
              ) : (

                <>
                  <Nav>
                    <Button variant="primary" onClick={handleShowLogin} className="ml-2">Login</Button>
                  </Nav>
                </>
              )}

            </Navbar>
          </div>
        </Navbar>

      </div>
    </>
  );
};

export default Header;
