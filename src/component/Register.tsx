import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { AiOutlineUser } from "react-icons/ai";
import { User } from "../models/User";
import { useState } from "react";
import { useRegisterMutation } from "../api/shopapi";
import { useNavigate } from "react-router-dom";

function Register() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const [register, { data, isLoading, isError, error }] = useRegisterMutation();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
      const response = await register(user).unwrap();
      const token = response.data as string;
      navigate("/Login");
    } catch (err) {
      console.error("Failed to login:", error);
    }
    setValidated(true);
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
                Register
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
export default Register;
