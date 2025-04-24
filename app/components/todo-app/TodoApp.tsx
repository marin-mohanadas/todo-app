"use client";
import React, { useState } from "react";
import "./todo.css";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";

type Task = {
  id: number;
  name: string;
};

const TodoApp = () => {
  const [currentTask, setCurrentTask] = useState("");
  const [allTasks, setAllTask] = useState<Task[]>([]);
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());

  // Editing state
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  const storeTasks = () => {
    if (currentTask.trim() === "") return;

    const newTask: Task = {
      id: Date.now(),
      name: currentTask,
    };

    setAllTask((prev) => [...prev, newTask]);
    setCurrentTask("");
  };

  const isTaskCompleted = (taskId: number) => {
    setCheckedIds((prev) => {
      const newChecked = new Set(prev);
      newChecked.has(taskId)
        ? newChecked.delete(taskId)
        : newChecked.add(taskId);
      return newChecked;
    });
  };

  const startEditing = (task: Task) => {
    setEditId(task.id);
    setEditText(task.name);
  };

  const saveEdit = () => {
    if (editId === null) return;
    setAllTask((prev) =>
      prev.map((task) =>
        task.id === editId ? { ...task, name: editText.trim() } : task
      )
    );
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditText("");
  };

  const deleteTask = (taskId: number) => {
    setAllTask((prev) => prev.filter((task) => task.id !== taskId));
    setCheckedIds((prev) => {
      const updated = new Set(prev);
      updated.delete(taskId);
      return updated;
    });
    if (editId === taskId) cancelEdit();
  };

  const totalTasks = allTasks.length - checkedIds.size || 0;
  return (
    <div className="container">
      <h2>Your TODO List</h2>

      <div className="input-group">
        <input
          className="todo-input"
          type="text"
          placeholder="Add your task"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
        />
        <button
          className="icon-button"
          onClick={storeTasks}
          disabled={!currentTask.trim()}
          title="Add Task"
        >
          <AddIcon />
        </button>
      </div>

      <h3>
        {`You have ${totalTasks}
        ${totalTasks === 1 ? "task" : "tasks"} to complete`}
      </h3>

      <table className="table table-striped">
        <tbody>
          {allTasks.map((task) => (
            <tr key={task.id}>
              <td>
                {editId === task.id ? (
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="todo-input"
                  />
                ) : (
                  <span
                    onClick={() => isTaskCompleted(task.id)}
                    style={{
                      paddingLeft: "30px",
                      textDecoration: checkedIds.has(task.id)
                        ? "line-through"
                        : "none",
                      cursor: "pointer",
                    }}
                  >
                    {task.name}
                  </span>
                )}
              </td>
              <td>
                <div className="task-buttons">
                  {editId === task.id ? (
                    <>
                      <button
                        className="icon-button"
                        onClick={saveEdit}
                        title="Save"
                      >
                        <SaveIcon />
                      </button>
                      <button
                        className="icon-button"
                        onClick={cancelEdit}
                        title="Cancel"
                      >
                        <CloseIcon />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="icon-button"
                        onClick={() => startEditing(task)}
                        disabled={checkedIds.has(task.id)}
                        title="Edit Task"
                      >
                        <EditIcon />
                      </button>
                      <button
                        className="icon-button"
                        onClick={() => deleteTask(task.id)}
                        title="Delete Task"
                      >
                        <DeleteIcon />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoApp;
