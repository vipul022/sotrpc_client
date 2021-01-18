import React from "react";
import { Container, Alert } from "react-bootstrap";
import { useGlobalState } from "../../config/globalState";

const ErrorMessage = () => {
  const { store } = useGlobalState();
  const { errorMessage } = store;

  return (
    <Container>
      {errorMessage && (
        <Alert variant="danger">
          {errorMessage}
        </Alert>
      )}
    </Container>
  );
};
export default ErrorMessage;
