"use client";
import React, { useState } from "react";

const TodoApp = () => {
  const [currentTask, setCurrentTask] = useState("");
  const [allTasks, setAllTask] = useState<string[]>([]);

  const storeTasks = () => {
    if (currentTask.trim() === "") return;

    setAllTask((prev) => [...prev, currentTask]);
    setCurrentTask("");
  };

  const editTask = (taskIndex: number) => {
    console.log(taskIndex);
  };

  const deleteTask = (taskIndex: number) => {
    setAllTask((prevTasks) =>
      prevTasks.filter((_, index) => index !== taskIndex)
    );
  };

  return (
    <div>
      <h2>Your TODO List</h2>
      <input
        className="todo-input"
        type="text"
        placeholder="Add your task"
        value={currentTask}
        onChange={(e) => setCurrentTask(e.target.value)}
      />
      <button onClick={storeTasks} disabled={!currentTask.trim()}>
        Add
      </button>
      <h3>ToDo Items</h3>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Task</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allTasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task}</td>
              <td>
                <button onClick={() => editTask(index)}>Edit</button>
                <button onClick={() => deleteTask(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;
