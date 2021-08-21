import { render, fireEvent, waitFor } from "@testing-library/react";
import Todo from ".";

test("Todo renders", () => {
  const { getByText, debug } = render(<Todo />);
  debug();
  expect(getByText("Todo Items")).not.toBe(null);
});

test("Can add todo", () => {
  const { getByText, getByTestId, debug } = render(<Todo />);
  const input = getByTestId("input");
  const button = getByText("Add Item");

  fireEvent.change(input, { target: { value: "Do this" } });
  fireEvent.click(button);

  debug();
  expect(getByText("Do this")).not.toBe(null);
  //   await waitFor(() => expect(getByText("Do this")).not.toBe(null));
});

test("Can mark todo as done", () => {
  const { getByText, getByTestId, debug } = render(<Todo />);
  const input = getByTestId("input");
  const button = getByText("Add Item");

  fireEvent.change(input, { target: { value: "Do this" } });
  fireEvent.click(button);
  const doneButton = getByText("Done");
  fireEvent.click(doneButton);

  expect(getByText("Do this")).not.toBe(null);
  expect(getByText("Do this")).toHaveStyle("text-decoration: line-through");
});
