import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/globalState";
import { loginUser } from "../../services/authServices";
import Header from "../Header/Header";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Form, Container, Button} from "react-bootstrap";

const SignIn = ({ history }) => {
  // !extracting dispatch from global state
  const { dispatch } = useGlobalState();

  const initialFormState = {
    email: "",
    password: "",
  };

  const [userDetails, setUserDetails] = useState(initialFormState);
  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  //!loginUser is a function that hit the backend api and save data to the db
  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(userDetails)
      .then((data) => {
        const LoggedInUser = data.user;

        // !changing state of loggedInUser with dispatch
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
    <div>
      <Container className="small-container">
        <Header history={history}>Login</Header>
        <ErrorMessage/>
        <Form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default SignIn;
