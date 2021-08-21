import React from "react";
import { Button } from "react-bootstrap";

const TodoItem = ({ title, onDone, onDelete, isDone }) => {
  return (
    <div>
      <div
        data-testid="todo-item"
        className="flex align-items-center justify-between p-2 pl-0 border-2 border-gray-200 rounded-md my-4 "
      >
        <h2 style={{ textDecoration: isDone() ? "line-through" : "none" }}>
          {title}
        </h2>
        <div>
          <Button className="mr-4" onClick={onDone}>
            Done
          </Button>
          {/* <Button variant="danger" className="bg-red-700" onClick={onDelete}>
            Delete
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
