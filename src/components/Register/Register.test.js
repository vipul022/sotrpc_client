import React from "react";
import {
  render,
  fireEvent,
  screen,
  getByTestId,
  container,
} from "@testing-library/react";
import Register from "./Register";
import { StateContext } from "../../config/globalState";
// import { server, rest } from "../../test/server";

import "@testing-library/jest-dom/extend-expect";

import { BrowserRouter, Route } from "react-router-dom";
import Home from "../Home/Home";

const store = {
  classes: [],
  members: [],
  photos: [],
  LoggedInUser: {},
  errorMessage: null,
  fileState: {
    success: false,
    url: "",
    description: "",
    file: {},
    selectedFile: "",
    type: "",
  },
};
const renderComponent = () => {
  render(
    <StateContext.Provider value={{ store }}>
      <BrowserRouter>
        <Register />

        {/* user is redirected to home page after successfully creating the user, therefore home component is passed below  */}
        <Route exact path="/" component={Home} />
      </BrowserRouter>
    </StateContext.Provider>
  );
};

describe("Register component renders as expected", () => {
  // !beforeEach render the Register before every test
  beforeEach(() => {
    render(
      <StateContext.Provider value={{ store }}>
        <Register />
      </StateContext.Provider>
    );
  });
  test("Should render 'Create Account' heading ", () => {
    screen.getByText(/create account/i).toBeInTheDocument;
  });
  test("should render ' Full Name' label", () => {
    screen.getByText(/full name/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your full name...").toBeInTheDocument;
  });
  test("should render 'Address' label", () => {
    screen.getByTestId("address").toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your address...").toBeInTheDocument;
  });
  test("should render 'Email' label", () => {
    screen.getByText(/email address/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your email...").toBeInTheDocument;
  });
  test("should render 'Password' label", () => {
    screen.getByText(/password/i).toBeInTheDocument;
  });
  test("should select input element by placeholder text", () => {
    screen.getByPlaceholderText("Enter your password...").toBeInTheDocument;
  });
  // ! all methods starting with query does not throw error but it is very useful for checking negative outcome using expect with it as it returns null in such cases
  test('should not find the role "whatever" in our component', () => {
    expect(screen.queryByRole("whatever")).toBeNull();
  });
  test("should select input elements by their role", () => {
    expect(screen.getAllByRole("textbox").length).toEqual(4);
  });
  test("all text boxes should have required attribute", () => {
    expect(screen.getAllByRole("textbox")).toBeRequired;
  });
  test("should render input box for email", () => {
    screen.getByTestId("email").toBeInTheDocument;
  });
  test("email field should be required", () => {
    expect(screen.getByTestId("email")).toBeRequired;
  });
  test("should select 'back' button by it's role", () => {
    screen.getByRole("button", { name: /back/i });
  });
  test("should select 'create account' button by it's role", () => {
    screen.getByRole("button", { name: /submit/i });
  });
});
//  ! reference taken from: https://www.npmjs.com/package/@testing-library/react
describe("Register component creates a user as expected", () => {
  test("on click 'Create Account' button, Register component should create a new user and redirect to home page ", async () => {
    //! fill out the form for testing
    renderComponent();

    fireEvent.change(screen.getByTestId("name"), {
      target: { value: "vipul" },
    });
    fireEvent.change(screen.getByTestId("address"), {
      target: { value: "123 fake street, Melbourne" },
    });
    fireEvent.change(screen.getByTestId("phone"), {
      target: { value: "0999999999" },
    });
    fireEvent.change(screen.getByTestId("email"), {
      target: { value: "vipul@test.com" },
    });
    fireEvent.change(screen.getByTestId("password"), {
      target: { value: "123456" },
    });

    const button = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(button);

    expect(
      await screen.getByRole("heading", {
        name: /“e concrematio\. confirmatio \-/i,
      })
    );
  });

  // test.only("should display server error if request fails", async () => {
  //   const testErrorMessage =
  //     "Authentication failed, please check user name and password";
  //   console.log("inside server.use=>");
  //   server.use(
  //     rest.post("/users", async (req, res, ctx) => {
  //       return res(
  //         ctx.status(409),
  //         ctx.json({ errorMessage: testErrorMessage })
  //       );
  //     })
  //   );

  //   render(
  //     <StateContext.Provider value={{ store }}>
  //       <Register />
  //     </StateContext.Provider>
  //   );
  //   // ! fill the form
  //   fireEvent.change(screen.getByTestId("name"), {
  //     target: { value: "vipul" },
  //   });
  //   fireEvent.change(screen.getByTestId("address"), {
  //     target: { value: "123 fake street, Melbourne" },
  //   });
  //   fireEvent.change(screen.getByTestId("phone"), {
  //     target: { value: "0999999999" },
  //   });
  //   fireEvent.change(screen.getByTestId("email"), {
  //     target: { value: "vipul@test.com" },
  //   });
  //   fireEvent.change(screen.getByTestId("password"), {
  //     target: { value: "123456" },
  //   });
  //   const button = screen.getByRole("button", { name: /submit/i });

  //   fireEvent.click(button);

  //   expect(await screen.getByTestId("errorMessage")).toHaveTextContent(
  //     testErrorMessage
  //   );
  // });
});
