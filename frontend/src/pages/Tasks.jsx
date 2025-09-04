import { useState, useEffect } from "react";
import API from "../api.js";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

 const fetchTasks = async () => {
   try {
     const res = await API.get("/tasks");
     if (Array.isArray(res.data)) {
       setTasks(res.data);
     } else {
       console.error("API response is not an array:", res.data);
       setTasks([]); // Set to an empty array to prevent the error
     }
   } catch (error) {
     console.error("Failed to fetch tasks:", error);
     setTasks([]); // Set to an empty array on error
   }
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
        {tasks.map((t, index) => (
          <li key={index}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
