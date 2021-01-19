import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/globalState";
import { registerUser } from "../../services/authServices";
import Header from "../Header/Header";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Form, Container, Button } from "react-bootstrap";

const Register = ({ history }) => {
  // ! set the initial form states to empty strings
  const initialFormState = {
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  };

  useEffect(() => {
    dispatch({
      type: "setErrorMessage",
      data: null,
    });
    // eslint-disable-next-line
  }, []);

  // ! setting userDetails with useState hook
  const [userDetails, setUserDetails] = useState(initialFormState);
  const { dispatch } = useGlobalState();

  const handleChange = (event) => {
    // ! extracting name and value from even.target with destructing
    const { name, value } = event.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //!RegisterUser is a function that hit the backend api and save data to the db
    registerUser(userDetails)
      .then((data) => {
        const LoggedInUser = data.user;

        dispatch({
          type: "setLoggedInUser",
          data: LoggedInUser,
        });
        history.push("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 409)
          dispatch({
            type: "setErrorMessage",
            data: "Authentication failed, please check user name and password",
          });
        else
          dispatch({
          type: "setErrorMessage",
          data: "There may be a problem with the server please try later",
        });
      });
  };
  return (
    <Container className="small-container">
      <Header history={history}>Create Account</Header>
      <ErrorMessage/>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder="Enter your full name..."
            data-testid="name"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            name="address"
            placeholder="Enter your address..."
            data-testid="address"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicAddress">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            required
            type="text"
            name="phone"
            placeholder="Enter your phone number..."
            data-testid="phone"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type="email"
            name="email"
            placeholder="Enter your email..."
            onChange={handleChange}
            data-testid="email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            type="password"
            name="password"
            placeholder="Enter your password..."
            onChange={handleChange}
            data-testid="password"
          />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};
export default Register;
