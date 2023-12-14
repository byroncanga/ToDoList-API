import React, { useState, useEffect } from "react";

const Home = () => {
  const endpoint =
    "https://playground.4geeks.com/apis/fake/todos/user/byroncanga";
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const getApi = async () => {
    const response = await fetch(endpoint);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    getApi();
  }, []);

  //envia el Task al API
  const sendTaskApi = async (task) => {
    const responde = await fetch(endpoint, {
      method: "PUT",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  //captura el evento input
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  //crea el task en la lista
  const handleNewTask = () => {
    if (inputValue.trim() === "") {
      alert("Por favor, ingresa una tarea válida.");
      return;
    }
    const newTasks = [...tasks, { done: false, label: inputValue }];
    setTasks(newTasks);
    setInputValue("");
    sendTaskApi(newTasks);
  };

  //elimina el task de la lista
  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
    sendTaskApi(newTasks);
  };

  const fechaActual = new Date().toLocaleDateString();

  return (
    <div className="containerGrid">
      <div className="box">
        <div className="text-center">
          <div className="d-flex">
            <div className="imgBox">
              <img
                className="imgHeader"
                src="https://lh3.googleusercontent.com/a/ACg8ocIdw9SHZnqt4rm4UWshytYtc6Xl6Xbc5mtQBxChcbiXcGQ=s288-c-no"
                alt=""
              />
            </div>
            <div className="d-flex flex-column align-items-start mx-2 mb-3">
              <h1 className=" text-light ">My Day</h1>
              <p className="text-light">{fechaActual}</p>
            </div>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              <i className="bi bi-input-cursor-text"></i>
            </span>
            <input
              name="input"
              type="text"
              className="form-control input"
              placeholder="Agregar nueva tarea"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="Btn"
              id="basic-addon1"
              onClick={handleNewTask}
            >
              <div className="sign">+</div>
              <div className="text"> Add</div>
            </button>
          </div>
        </div>
        <div>
          {tasks.map((task, index) => (
            <div
              className="d-flex align-items-center justify-content-between"
              key={index}
            >
              <div className="w-100 bg-light p-2 rounded-2 my-2 mx-1">
                {task.label}
              </div>
              <div>
                <button
                  className="button"
                  onClick={() => handleDeleteTask(index)}
                >
                  <span className="X"></span>
                  <span className="Y"></span>
                  <div className="close">Close</div>
                </button>
              </div>
            </div>
          ))}
        </div>
        <hr />
        <p className="text-light">Total de Tareas {tasks.length}</p>
      </div>
    </div>
  );
};

export default Home;
