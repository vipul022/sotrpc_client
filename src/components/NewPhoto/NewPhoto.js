import React, { useEffect } from "react";
import Header from "../Header/Header";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Form, Container, Button, Alert } from "react-bootstrap";
import { uploadFile } from "../../services/fileServices";
import { validatePhoto } from "../../validations/photoValidations";
import { useGlobalState } from "../../config/globalState";

// ! reference taken from https://medium.com/@khelif96/uploading-files-from-a-react-app-to-aws-s3-the-right-way-541dd6be689 but class component has been changed to functional component
const NewPhoto = ({ history }) => {
  const { store, dispatch } = useGlobalState();
  // !extracting fileState and errorMessage
  const { fileState } = store;

  const { selectedFile, success } = fileState;
  //  ! When component initially renders set the type to photos. Set the success and error message to null
  useEffect(() => {
    const updatedData = {
      ...fileState,
      description: "",
      type: "photos",
      success: false,
    };
    dispatch({
      type: "setFileState",
      data: updatedData,
    });
    dispatch({
      type: "setErrorMessage",
      data: null,
    });
    // eslint-disable-next-line 
  }, []);

  const handleDescriptionChange = (event) => {
    const { name, value } = event.target;
    const updatedData = {
      ...fileState,
      [name]: value,
    };

    dispatch({
      type: "setFileState",
      data: updatedData,
    });
    dispatch({
      type: "setErrorMessage",
      data: null,
    });
  };

  // ! extracted uploaded file from event.target.files[0] and set to state of selected file
  const handleFileChange = (event) => {
    const updatedData = {
      ...fileState,
      selectedFile: event.target.files[0],
      success: false,
    };
    dispatch({
      type: "setFileState",
      data: updatedData,
    });

    dispatch({
      type: "setErrorMessage",
      data: null,
    });
  };

  const handleUpload = (event) => {
    event.preventDefault();

    //  ! passed dispatch as argument to change the global state
    if (validatePhoto(selectedFile, dispatch)) uploadFile(fileState, dispatch);
  };

  return (
    <Container className="small-container">
      <Header history={history}>Upload Photo</Header>
      <ErrorMessage/>
      {success && (
        <Alert variant="success">
          <p>Upload Successful!</p>
        </Alert>
      )}
      <Form onSubmit={handleUpload}>
        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            maxLength="60"
            name="description"
            placeholder="Enter description..."
            onChange={handleDescriptionChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicFile">
          <Form.Control required type="file" onChange={handleFileChange} />
        </Form.Group>
        <Button type="submit">Upload Photo</Button>
      </Form>
    </Container>
  );
};

export default NewPhoto;
