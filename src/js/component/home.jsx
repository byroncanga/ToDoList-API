import React, { useState, useEffect } from "react";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleNewTask = () => {
    if (inputValue.trim() === "") {
      alert("Por favor, ingresa una tarea válida.");
      return;
    }
    const newTasks = [...tasks, inputValue];
    setTasks(newTasks);
    setInputValue("");
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(newTasks);
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
            <div className="d-flex align-items-center justify-content-between">
              <div
                className="w-100 bg-light p-2 rounded-2 my-2 mx-1"
                key={index}
              >
                {task}
              </div>
              <div>
                <button class="button" onClick={() => handleDeleteTask(index)}>
                  <span class="X"></span>
                  <span class="Y"></span>
                  <div class="close">Close</div>
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
