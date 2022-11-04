import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EditItem({ axiosPosts }) {
  const [Editing, SetEdit] = useState(false);
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();
  const [items, setItems] = useState({
    id: null,
    title: "",
    description: "",
    complete: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    var csrftoken = getCookie("csrftoken");

    var url = `http://127.0.0.1:8000/api/task-update/${id}/`;
    fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(items),
    })
      .then((res) => {
        fetchAPI();
        axiosPosts();
        SetEdit(false);
      })
      .then((res) => {
        axiosPosts();
      })
      .catch(function (error) {
        console.log("ERROR:", error);
      });
  };

  const getCookie = (name) => {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      var cookies = document.cookie.split(";");
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  useEffect(() => {
    fetchAPI();
  }, [id]);

  const fetchAPI = async () => {
    const response = await axios(
      `http://127.0.0.1:8000/api/task-detail/${id}/`
    );
    setTasks(response.data);
  };

  const startEdit = (tasks) => {
    setItems(tasks);
    SetEdit(true);
  };

  return !Editing ? (
    <div id="task-container">
      <div id="form-wrapper">
        <div className="flex-wrapper--column">
          <div className="container-items">
            <div style={{ flex: 6 }}>
              <h4>{tasks.title}</h4>
            </div>
            <div className="paper">
              <p>{tasks.description}</p>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <button id="Edit" onClick={(e) => startEdit(tasks)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div id="task-container">
      <div id="form-wrapper">
        <form onSubmit={(e) => handleSubmit(e)} id="form">
          <div className="flex-wrapper--column">
            <div className="container-items">
              <div className="Bottom-section">
                <div style={{ flex: 6 }}>
                  <input
                    onChange={(e) => {
                      setItems({ ...items, title: e.target.value });
                    }}
                    className="form-control"
                    id="title"
                    value={items.title}
                    type="text"
                    name="title"
                  />
                </div>
                <div className="checkbox--item" style={{ flex: 1 }}>
                  <input
                    onChange={(e) => {
                      if (document.getElementById("checkbox").checked) {
                        setItems({ ...items, complete: true });
                      } else {
                        setItems({ ...items, complete: false });
                      }
                    }}
                    id="checkbox"
                    type="checkbox"
                    value={items.complete}
                  ></input>
                </div>
              </div>
              <div className="paper">
                <textarea
                  onChange={(e) => {
                    setItems({ ...items, description: e.target.value });
                  }}
                  className="content"
                  id="description"
                  name="description"
                  rows="12"
                  cols="100"
                  value={items.description}
                ></textarea>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <input
                id="submit"
                className="btn btn-warning"
                type="submit"
                name="Add"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
