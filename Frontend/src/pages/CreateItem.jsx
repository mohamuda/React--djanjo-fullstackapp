import React from "react";
import { useState } from "react";

export default function CreateItem({ axiosPosts }) {
  const [items, setItems] = useState({
    id: null,
    title: "",
    description: "",
    complete: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    var csrftoken = getCookie("csrftoken");

    var url = "http://127.0.0.1:8000/api/task-create/";
    fetch(url, {
      method: "post",
      headers: {
        "content-type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify(items),
    })
      .then((res) => {
        axiosPosts();
        setItems({
          id: null,
          title: "",
          description: "",
          complete: false,
        });
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

  return (
    <div id="task-container">
      <div id="form-wrapper">
        <form onSubmit={(e) => handleSubmit(e)} id="form">
          <div className="flex-wrapper--column">
            <div className="container-items">
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
                  placeholder="Add task.."
                />
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
                  placeholder="Add description.."
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
