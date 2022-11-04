import React from "react";
import { Link } from "react-router-dom";

export default function List({ tasks, axiosPosts }) {
  const deleteItem = (task) => {
    fetch(`http://127.0.0.1:8000/api/task-delete/${task.id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      axiosPosts();
    });
  };

  return (
    <div id="task-container">
      <div id="list-wrapper">
        {tasks.map(function (task, index) {
          return (
            <Link
              key={index}
              to={`/EditItem/${task.id}`}
              style={{ textDecoration: "none" }}
            >
              <div key={index} className="task-wrapper flex-wrapper">
                <div style={{ flex: 7 }}>
                  {task.complete === false ? (
                    <span>{task.title}</span>
                  ) : (
                    <strike style={{ textdecorationline: "line-through" }}>
                      {task.title}
                    </strike>
                  )}
                </div>
                <div style={{ flex: 0 }}>
                  <button
                    onClick={() => deleteItem(task)}
                    className="btn btn-sm btn-outline-dark delete"
                  >
                    -
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
