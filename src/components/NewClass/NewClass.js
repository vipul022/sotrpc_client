import React, { useState } from "react";
import { useGlobalState } from "../../config/globalState";
import { addNewClass } from "../../services/classesServices";

import Header from "../Header/Header";

import { Form, Container, Button } from "react-bootstrap";
const NewClass = ({ history }) => {
  // !accessing current state of classes from store
  const { store, dispatch } = useGlobalState();

  const { classes } = store;

  const initialFormState = {
    title: "",
    description: "",
    time: "",
    maxNumber: "",
    teacher: "",
  };

  const [formState, setFormState] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // !creating nextId for add a new class, this function was used earlier to test the component with dummy data
  // function getNextId() {

  //   const ids = classes.map((c) => c._id);
  //   return ids.sort()[ids.length - 1] + 1;
  // }

  const handleSubmit = (event) => {
    event.preventDefault();

    const newClass = {
      title: formState.title,
      description: formState.description,
      time: formState.time,
      maxNumber: formState.maxNumber,
      teacher: formState.teacher,
    };

    addNewClass(newClass)
      .then((newClassData) => {
        dispatch({
          type: "setClasses",
          data: [...classes, newClassData],
        });
        history.push("/classes");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <Container className="small-container">
        <Header history={history}>Add New Class</Header>

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              name="title"
              placeholder="Enter class name..."
              data-testid="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              required
              name="description"
              placeholder="Enter description..."
              onChange={handleChange}
              data-testid="description"
            />
          </Form.Group>
          <Form.Group controlId="formBasicTime">
            <Form.Label>Time</Form.Label>
            <Form.Control
              required
              type="text"
              name="time"
              placeholder="Enter class timings..."
              onChange={handleChange}
              data-testid="time"
            />
          </Form.Group>
          <Form.Group controlId="formBasicMaxNumber">
            <Form.Label>Max Number</Form.Label>
            <Form.Control
              required
              type="number"
              name="maxNumber"
              onChange={handleChange}
              data-testid="maxNumber"
            />
          </Form.Group>
          <Form.Group controlId="formBasicTeacher">
            <Form.Label>Teacher</Form.Label>
            <Form.Control
              required
              type="text"
              name="teacher"
              placeholder="Enter teacher's name..."
              onChange={handleChange}
              data-testid="teacher"
            />
          </Form.Group>
          <Button type="submit">Create Class</Button>
        </Form>
      </Container>
    </div>
  );
};

export default NewClass;
