import React, { useEffect } from "react";

import { useGlobalState } from "../../config/globalState";
import { getAllClasses, deleteClass } from "../../services/classesServices";
import ButtonComponent from "../Button/Button";

import Container from "react-bootstrap/Container";

import Header from "../Header/Header";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const Classes = ({ history }) => {
  // !useGlobalState is used to access store and dispatch globally which are defined in app.js
  const { store, dispatch } = useGlobalState();
  const { classes, LoggedInUser } = store;

  const { role } = LoggedInUser;

  const fetchClasses = () => {
    getAllClasses()
      .then((classData) => {
        dispatch({
          type: "setClasses",
          data: classData,
        });
      })
      .catch((error) => {
        dispatch({
          type: "setErrorMessage",
          data: `${error}`,
        });
      });
  };
  // ! When component initially renders, fetch classes from backend
  useEffect(() => {
    fetchClasses();
    dispatch({
      type: "setErrorMessage",
      data: null,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    // !event.target.dataset.id is used to retrieve the id of the particular class
    const id = event.target.dataset.id;
    const updatedClasses = classes.filter((c) => c._id !== id);

    deleteClass(id)
      .then((response) => {
        dispatch({
          type: "setClasses",
          data: updatedClasses,
        });
      })
      .catch((error) => {
        dispatch({
          type: "setErrorMessage",
          data: `${error}`,
        });
      });
  };
  const handleEdit = (event) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    history.push(`/classes/edit/${id}`);
  };

  // ! function for conditionally rendering delete and edit buttons
  const showDeleteEdit = (c) => {
    return role === "Admin" ? (
      <>
        <ButtonComponent clicked={handleDelete} record={c}>
          Delete
        </ButtonComponent>
        <ButtonComponent clicked={handleEdit} record={c}>
          Edit
        </ButtonComponent>
      </>
    ) : null;
  };

  const handleClick = () => {
    history.push("/classes/register");
  };

  // ! Conditionally set class to button for styling
  const classButtons = role === "Admin" ? "class-buttons" : null;
  const content =
    classes &&
    classes.map((c) => {
      return (
        <div key={c._id}>
          <Container className="class-card">
            <h3>{c.title}</h3>
            <p className="class-description">{c.description}</p>
            <p>Time: {c.time}</p>
            <p>Maximum number of students: {c.maxNumber}</p>
            <div className={classButtons}>
              {showDeleteEdit(c)}
              <ButtonComponent clicked={handleClick} record={c}>
                Sign up for this class
              </ButtonComponent>
            </div>
          </Container>
        </div>
      );
    });

  return (
    <div>
      <Container className="main-container">
        <Header
          history={history}
          showButton={"New"}
          clicked={() => history.push("/classes/new")}
        >
          Classes
        </Header>
        <ErrorMessage/>
        <Container className="classes-container">{content}</Container>
      </Container>
    </div>
  );
};
export default Classes;
