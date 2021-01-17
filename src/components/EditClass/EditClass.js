import React, { useState, useEffect } from "react";
import { useGlobalState } from "../../config/globalState";
import { updateClass, getClassFromId } from "../../services/classesServices";

import Header from "../Header/Header";
import { Form, Container, Button } from "react-bootstrap";
const EditClass = (props) => {
  const { store, dispatch } = useGlobalState();
  const { classes } = store;
  // !extracting history from props
  const { history } = props;

  // !extracting id from props
  const id = props.match.params.id;

  // !getting a class with a specific id
  const cl = getClassFromId(classes, id);

  // !set initial form values to empty string
  const initialFormState = {
    title: "",
    description: "",
    time: "",
    maxNumber: "",
    teacher: "",
  };
  const [formState, setFormState] = useState(initialFormState);
  // ! This will update the form with the values of the specific class  immediately after a component is mounted. This is invoked only for the initial render. This hook is equivalent to componentDidMount() in class components
  useEffect(() => {
    setFormState({
      title: cl.title,
      description: cl.description,
      time: cl.time,
      maxNumber: cl.maxNumber,
      teacher: cl.teacher,
    });
  }, []);
  function handleChange(event) {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // !created an updated class
    const updatedClass = {
      _id: cl._id,
      title: formState.title,
      description: formState.description,
      time: formState.time,
      maxNumber: formState.maxNumber,
      teacher: formState.teacher,
    };

    const otherClasses = classes.filter((c) => c._id !== updatedClass._id);

    updateClass(updatedClass)
      .then((response) => {
        dispatch({
          type: "setClasses",
          data: [...otherClasses, updatedClass],
        });
      })
      .catch((error) => console.log(error));
    history.push("/classes");
  };

  return (
    <Container className="small-container">
      <Header history={history}>Edit Class</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            value={formState.title}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formState.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicTime">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="text"
            name="time"
            value={formState.time}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicMaxNumber">
          <Form.Label>Max number of students</Form.Label>
          <Form.Control
            type="number"
            name="maxNumber"
            value={formState.maxNumber}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicTeacher">
          <Form.Label>Teacher </Form.Label>
          <Form.Control
            type="text"
            name="teacher"
            value={formState.teacher}
            onChange={handleChange}
          />
        </Form.Group>
        <Button type="submit">Update</Button>
      </Form>
    </Container>
  );
};

export default EditClass;
