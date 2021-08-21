import React, { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDone] = useState([]);
  const inputRef = useRef();
  const auth = useAuth();

  const addTodo = () => {
    const item = inputRef.current.value;
    setTodos((prev) => [...prev, { id: Math.random() * 100, title: item }]);
    inputRef.current.value = "";
  };

  return (
    <div className="flex justify-center  mt-24">
      <div>
        <h1 className="mb-4 text-center">
          Hey 👋 <span className="text text-green-700">{auth.user.name}</span>{" "}
        </h1>
        <h1 className="mb-4 text-center">Your todo items are</h1>
        <div className="flex">
          <Form.Control
            type="text"
            placeholder="Add todo..."
            className="mr-8"
            ref={inputRef}
            data-testid="input"
          />
          <Button onClick={addTodo} className="w-auto whitespace-nowrap">
            Add Item
          </Button>
        </div>
        <div>
          {todos.map((item) => (
            <TodoItem
              onDone={() => {
                setDone((prev) => [...prev, item]);
              }}
              title={item.title}
              key={item.id}
              isDone={() => {
                return doneTodos.some((todo) => todo.id === item.id);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
