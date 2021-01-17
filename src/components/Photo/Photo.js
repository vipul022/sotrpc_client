import React, { useEffect } from "react";
import { deleteFile } from "../../services/fileServices";
import { useGlobalState } from "../../config/globalState";
import ControlledCarousel from "../ControlledCarousel/ControlledCarousel";
import { Container, Alert } from "react-bootstrap";
import Header from "../Header/Header";

const Photo = (props) => {
  const { store, dispatch } = useGlobalState();
  const { photos, fileState, errorMessage } = store;

  const { type } = fileState;

  // !accessing photo and index from props those are being passed from Gallery component

  const { history } = props;
  const { photo, index } = props.location.state;

  useEffect(() => {
    const updatedData = {
      ...fileState,
      type: "photos",
    };
    dispatch({
      type: "setFileState",
      data: updatedData,
    });
    dispatch({
      type: "setErrorMessage",
      data: null,
    });
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    const updatedPhotos = photos.filter((p) => p._id !== photo._id);
    // ! passed type to deleteFile which calls backend api and as it is a pure function which can also be used to delete newsletters and minutes at a later stage
    deleteFile(photo._id, type)
      .then((response) => {
        dispatch({
          type: "setPhotos",
          data: updatedPhotos,
        });
      })
      .catch((error) => {
        dispatch({
          type: "setErrorMessage",
          data: `There was a problem saving the photo to S3, code ${error.response.status}, ${error.response.statusText}`,
        });
      });
    history.push("/photos");
  };

  return (
    <div>
      <Container className="main-container">
        <Header history={history} showButton={"Delete"} clicked={handleDelete}>
          Gallery
        </Header>
      </Container>
      <Container className="carousel-container">
        {errorMessage && (
          <Alert variant="danger">
            <p>{errorMessage}</p>
          </Alert>
        )}
        <ControlledCarousel index={index} photos={photos} />
      </Container>
    </div>
  );
};
export default Photo;
