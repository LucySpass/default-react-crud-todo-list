import React, { useState } from "react";
import { TodoInterface } from "../interfaces/todo";

type TodoListProps = {
  todos: TodoInterface[];
  changeDone: (id: number) => void;
  deleteTodo: (id: number) => void;
  changeTodo: (id: number, newText: string) => void;
};
export const TodoList = ({
  todos,
  changeDone,
  deleteTodo,
  changeTodo
}: TodoListProps) => {
  const [todoInput, setTodoInput] = useState<string>("");
  const [editModeId, setSetEditModeId] = useState<number>(-1);

  return (
    <ul className="todoList">
      {todos.map((item, i) => (
        <li
          key={i}
          data-testid={`todo${i}`}
          className={item.done ? "done" : undefined}
        >
          <span>{item.text}</span>
          <button onClick={() => changeDone(i)}>
            {item.done ? "Mark undone" : "Mark done"}
          </button>
          {i === editModeId ? (
            <>
              <input
                aria-label="edit-todo-input"
                value={todoInput}
                onChange={(e) => setTodoInput(e.target.value ?? "")}
                className="addTodo"
              />
              <button
                onClick={() => {
                  changeTodo(i, todoInput);
                  setTodoInput("");
                  setSetEditModeId(-1);
                }}
              >
                Done
              </button>
            </>
          ) : (
            <button onClick={() => setSetEditModeId(i)}>Edit</button>
          )}

          <button onClick={() => deleteTodo(i)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
