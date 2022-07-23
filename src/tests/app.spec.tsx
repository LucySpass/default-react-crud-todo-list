import App from "../App";
import { fireEvent, render, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("TodoApp", () => {
  it("renders app", () => {
    const app = render(<App />);
    expect(app).not.toBeUndefined();
  });

  it("renders initial items", () => {
    render(<App />);

    expect(screen.getByText("Buy milk")).toBeDefined();
    expect(screen.getByText("Buy bread")).toBeDefined();
  });

  test("it should render newly added todo item", () => {
    const utils = render(<App />);
    const input = utils.getByLabelText("add-todo-input");

    fireEvent.change(input, { target: { value: "Buy matcha tea" } });
    expect((input as HTMLInputElement).value).toBe("Buy matcha tea");

    fireEvent.click(utils.getByText("Add"));

    expect(screen.getByText("Buy matcha tea")).toBeDefined();
  });

  test("it should delete a todo item", () => {
    const utils = render(<App />);
    const todoLi = utils.getByTestId("todo0");
    const deleteButton = within(todoLi).getByText("Delete");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Buy milk")).toBeNull();
  });

  test("it should edit a todo item", () => {
    const utils = render(<App />);
    const todoLi = utils.getByTestId("todo0");

    const editButton = within(todoLi).getByText("Edit");
    fireEvent.click(editButton);

    const input = within(todoLi).getByLabelText("edit-todo-input");

    fireEvent.change(input, { target: { value: "Buy sunscreen!" } });
    expect((input as HTMLInputElement).value).toBe("Buy sunscreen!");

    fireEvent.click(utils.getByText("Done"));

    expect(screen.getByText("Buy sunscreen!")).toBeDefined();
  });
});
