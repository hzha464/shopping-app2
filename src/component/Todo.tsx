import Badge from "react-bootstrap/Badge";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../api/shopapi";
import { User } from "../models/User";
import { log } from "console";
import { BiUserX } from "react-icons/bi";
import { ServiceResponse } from "../models/ServiceResponse";

function Todo() {
  const [login, { data, isLoading, isError, error }] = useLoginMutation();
  // console.log(data);

  const [validated, setValidated] = useState(false);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    let formData = new FormData(form);
    let username: string = formData.get("username") as string;
    let password: string = formData.get("password") as string;
    const user: User = { Username: username, Password: password };
    console.log(data);
    try {
      // Call the login mutation
      const response = await login(user).unwrap();

      console.log(response.data);
    } catch (err) {
      console.error("Failed to login:", err);
      // Your logic to handle errors
    }
    // console.log(formData.get("username"));
    // console.log("5");
    // login(user);
  };

  return (
    <div>
      {" "}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Username</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Username"
              defaultValue="username"
              name="username"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>password</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="password"
              defaultValue="password"
              name="password"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Submit form</Button>
      </Form>
      <BiUserX />
    </div>
  );
}

export default Todo;
