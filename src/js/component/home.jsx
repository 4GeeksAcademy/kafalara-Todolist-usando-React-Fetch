import React, { useState, useEffect } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';

const Home = () => {
  const [todos, setTodos] = useState([]);  // TAREAS
  const [newTodo, setNewTodo] = useState("");  // nueva tarea


  const apiUrl = "https://playground.4geeks.com/todo/users/kafalara"; // URL de la operacion API
  const apiTodos = "https://playground.4geeks.com/todo/todos/kafalara"; // URL de la operacion API
  const apiDelete = "https://playground.4geeks.com/todo/todos";

  // Carga tareas cuando la API inicie con GET
  const tareaKafalara = () => {
    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data)
      if (Array.isArray(data.todos)) {
        setTodos(data.todos);  // SI, que 'data' sea un array
      } else {
        setTodos([]);  // Si no es un array, que este vacio
      }
    })
};

useEffect(() => {
  tareaKafalara();  // Llamada para obtener tareas al iniciar la aplicación
}, []);


  //POST- CREA UNA NUEVA TAREA EN EL SERVIDOR
  const createTaskOnServer = (newTodo) => {
    fetch(apiTodos, {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error("Error al crear la tarea");
      }
      return resp.json();
    })
    .then(() => {
tareaKafalara();  // Actualizar la lista de tareas después de agregar una nueva
    })
    };
  

  // Función que maneja la tecla ENTER para agregar tareas
  const handleKeyDown = (e) => {
    if (e.code === "Enter" && newTodo.trim() !== "") {
      const newTask = { label: newTodo, done: false };
      createTaskOnServer(newTask);  // PUT - SINCRONIZA
      setNewTodo("");  // quitar despues de agregar
    }
  };

    // Función para eliminar tareas individuales
    const removeTask = (id) => {
      fetch(`${apiDelete}/${id}`, {
        method:"DELETE",
        headers: {
          "Content-Type": "application/json"
        }


      }

      )
      
    };

    // eliminar tareas
  const clearAllTasks = () => {
    if (todos.length > 0) {
    const updatedTodos = [];  // Vacía la lista
    setTodos(updatedTodos);  // Limpia
    updateTasksOnServer(updatedTodos);  //  PUT - SINCRONIZA
  }
  };

  return (
    <>
      <div className="text-center mt-5">
      <h1 className ="todos-title">todos</h1>
      </div>

      {/* Uso de TodoInput como un componente y lo separo con un div diferente para el recuadro.*/}
      <div className="home-container">
      <TodoInput
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)} // estado de IMPUT
        onKeyDown={handleKeyDown}  //tecla ENTER
      />

      {/*lista de tareas */}
      <TodoList tasks={todos} removeTask={removeTask} />


       <button className="btn btn-danger mt-3" onClick={clearAllTasks}>
          Clear All Tasks
        </button>

        <p className="items-left">{todos.length} item{todos.length !== 1 && 's'} left</p>
    </div>
    </>
  );
};

export default Home;
