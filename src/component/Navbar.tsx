import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Outlet, useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Nav from "react-bootstrap/Nav";
import { BiUserX } from "react-icons/bi";
import { AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { useEffect, useState } from "react";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";

type tokenType = {
  token: string | null;
  setToken: (i: string | null) => void;
};

function NavBar() {
  // useEffect(() => {
  //   console.log(token);
  // }, [token]);

  const [token, setToken] = React.useState<string | null>(null);
  const handleclick = () => {
    console.log(token);
  };
  const logout = () => {
    setToken(null);
  };
  return (
    <>
      {/* {token && <p>{token}</p>} */}
      <Navbar
        as={Link}
        to="/"
        className={styles.bar}
        bg="dark"
        variant="dark"
        expand="lg"
      >
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="Hong.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Shopping website
          </Navbar.Brand>
          <Row className="d-flex align-items-center justify-content-center">
            {token && (
              <Col>
                <Link to="/Cart">
                  <div>
                    {" "}
                    <AiOutlineShoppingCart size={30} />
                  </div>
                </Link>
              </Col>
            )}

            <Col>
              {!token && (
                <Link to={"/Login"} className="d-flex align-items-center">
                  <span>
                    <BiUserX size={30} />
                  </span>
                  Login
                </Link>
              )}
              {token && (
                <div className="d-flex align-items-center" onClick={logout}>
                  <span>
                    <AiOutlineUser size={30} />
                  </span>
                  <div className="d-flex align-items-center  justify-content-center">
                    Logout
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Navbar>
      <Outlet context={{ token, setToken }} />
    </>
  );
}
export function useToken() {
  return useOutletContext<tokenType>();
}
export default NavBar;
