import { useState, useEffect } from "react";
import API from "../api.js";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!newTask) return;
    await API.post("/tasks", { title: newTask });
    setNewTask("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      <input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New Task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t._id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
