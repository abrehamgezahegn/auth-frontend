import SignUp from "./index";
import { render, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";

test("Sign up renders", () => {
  const history = createMemoryHistory();

  const { getByText, debug } = render(
    <Router history={history}>
      <SignUp />
    </Router>
  );
  //   debug();
  getByText("Email address");
});

test("Shows loading state", () => {
  const history = createMemoryHistory();

  const { getByLabelText, getByText, getByTestId, debug } = render(
    <Router history={history}>
      <SignUp />
    </Router>
  );
  const nameInput = getByLabelText("Name");
  const emailInput = getByLabelText("Email address");
  const passwordInput = getByLabelText("Password");
  const button = getByText("Signup");

  fireEvent.change(nameInput, { target: { value: "Abrehammm" } });
  fireEvent.change(emailInput, {
    target: { value: "abreha17167364646m@gmail.com" },
  });
  fireEvent.change(passwordInput, { target: { value: "password" } });
  fireEvent.click(button);

  debug();

  expect(getByTestId("loading-spinner")).not.toBe(null);
});
