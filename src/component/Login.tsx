import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Alert, Button, Form } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { User } from "../models/User";
import { useLoginMutation } from "../api/shopapi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useToken } from "./Navbar";
// import { setToken } from "./Navbar";

function Login() {
  // const { token, sToken } = setToken();

  const [validated, setValidated] = useState(false);
  const [login, { data, isLoading, isError, error }] = useLoginMutation();
  const { token, setToken } = useToken();

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // const savedData = localStorage.getItem("token");
    // console.log(savedData);

    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    let formData = new FormData(form);
    let username: string = formData.get("username") as string;
    let password: string = formData.get("password") as string;
    const user: User = { Username: username, Password: password };
    try {
      const response = await login(user).unwrap();
      const token = response.data as string;
      // sToken(token);
      setToken(token);
      navigate("/");
    } catch (err) {
      console.error("Failed to login:", error);
    }
    setValidated(true);
  };
  const registerClick = () => {
    navigate("/Register");
  };
  return (
    <>
      {!isLoading && error && (
        <Alert key="danger" variant="danger">
          invalid user
        </Alert>
      )}
      <Container
        fluid
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card className="text-center">
          <Card.Header>
            <AiOutlineUser size={30} />
          </Card.Header>
          <Card.Body>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="username"
                defaultValue=""
                name="username"
              />
              <Form.Label>password</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="password"
                defaultValue=""
                name="password"
              />
              <Button className="mt-2 me-2" type="submit">
                Login
              </Button>
              <Button className="mt-2 me-2" onClick={registerClick}>
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Login;
