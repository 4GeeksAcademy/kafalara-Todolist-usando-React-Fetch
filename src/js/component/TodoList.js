import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ tasks, removeTask }) => {
  if (!Array.isArray(tasks)) {
    return null;  // renderiza algún mensaje indicando que no hay tareas
  }


  return (
    <ul className="list-group mt-3">
      {tasks.map((task, index) => (
        <TodoItem 
        key={index} 
        task={task} 
        removeTask={() => removeTask(task.id)} /> //remover la tarea cuando se hace en la X
      ))}
    </ul>
  );
};

export default TodoList;


