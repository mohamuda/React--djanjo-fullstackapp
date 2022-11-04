import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CreateItem from "./pages/CreateItem";
import List from "./pages/List";
import EditItem from "./pages/EditItem";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosPosts();
  }, []);

  const axiosPosts = async () => {
    const tasksData = await axios("http://127.0.0.1:8000/api/task-list/");
    setTasks(tasksData.data);
    console.log(tasksData.data)
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/CreateItem"
            element={<CreateItem axiosPosts={axiosPosts} />}
          />
          <Route
            path="/"
            element={<List axiosPosts={axiosPosts} tasks={tasks} />}
          />
          <Route
            path="/EditItem/:id"
            element={<EditItem axiosPosts={axiosPosts} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
