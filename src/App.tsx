import React, { useState } from "react";
import { TodoList } from "./components/todoList";
import { TodoInterface } from "./interfaces/todo";

import "./styles.scss";

export default function App() {
  const [todos, setTodos] = useState<TodoInterface[]>([
    { text: "Buy milk", done: true },
    { text: "Buy bread", done: false }
  ]);

  const [todoInput, setTodoInput] = useState<string>("");

  const changeDoneMark = (id: number) => {
    const changedTodo: TodoInterface = todos[id];
    const tempTodos: TodoInterface[] = [...todos];
    tempTodos.splice(id, 1, { ...changedTodo, done: !changedTodo.done });
    setTodos(tempTodos);
  };

  const deleteTodo = (id: number) => {
    const tempTodos: TodoInterface[] = [...todos];
    tempTodos.splice(id, 1);
    setTodos(tempTodos);
  };

  const changeTodo = (id: number, newText: string) => {
    const changedTodo: TodoInterface = todos[id];
    const tempTodos: TodoInterface[] = [...todos];
    tempTodos.splice(id, 1, { ...changedTodo, text: newText });
    setTodos(tempTodos);
  };

  return (
    <div className="todoListApp">
      <div className="forsta-logo" />
      <input
        aria-label="add-todo-input"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value ?? "")}
        className="addTodo"
      />
      <button
        disabled={todoInput === ""}
        onClick={() => {
          setTodos([{ text: todoInput, done: false }, ...todos]);
          setTodoInput("");
        }}
      >
        Add
      </button>
      <TodoList
        changeDone={changeDoneMark}
        changeTodo={changeTodo}
        deleteTodo={deleteTodo}
        todos={todos}
      />
    </div>
  );
}
