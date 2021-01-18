import React from "react";
import Button from "react-bootstrap/Button";
// !history is passed as prop to implement back functionality
const BackButton = ({ history }) => {
  return (
    <Button variant="primary" onClick={() => history.goBack()}>
      Back
    </Button>
  );
};

export default BackButton;
