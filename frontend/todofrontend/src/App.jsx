import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [todos, setTodos] = useState([]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      id: Date.now(),
      newTask: task,
      newDate: date,
      isCompleted: false,
    };

    try {
      const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Printing errors here:", data.error);
        return;
      }

      setTask("");
      setDate("");
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/todos", {
          method: "GET",
        });
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.log(error, "Failed");
      }
    }
    fetchData();
  }, [refresh]);

  const handlePatchUpdate = async (id, updates) => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Backend error:", data.error);
        return;
      }

      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error("Network error:", error);
    }
  };
  
  const completedList = todos.filter((item) => item.isCompleted === true);
  const pendinglist = todos.filter((item) => item.isCompleted === false);
  return (
    <>
      <h1>Todo</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Submit Task</button>
      </form>
      <h1>Completed List </h1>
      {completedList.map((item) => {
        const originalIndex = item.id;
        return (
          <div key={`completed-${item.id}`}>
            <div>{item.newTask}</div>
            <span>{item.newDate}</span>
            <button
              onClick={() =>
                handlePatchUpdate(originalIndex, {
                  isCompleted: false,
                })
              }
            >
              Mark Incomplete
            </button>
          </div>
        );
      })}
      <h1>Pending List</h1>
      {pendinglist.map((item, index) => {
        const originalIndex = item.id;
        return (
          <div key={`pending-${item.id}`}>
            <div>{item.newTask}</div>
            <span>{item.newDate}</span>
            <button
              onClick={() =>
                handlePatchUpdate(originalIndex, {
                  isCompleted: true,
                })
              }
            >
              Mark Complete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default App;
