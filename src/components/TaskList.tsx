import { useState } from 'react'
//import uuid from 'react-uuid'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const taskIndex = (id: number): number => {
    const allTasks = [...tasks];
    return allTasks.findIndex(item => item.id === id);
  }

  function handleCreateNewTask() {
    if(!newTaskTitle) {
      alert('No task was informed!')
      return;
    }

    const id = Math.random() * (9999 - 1) + 1

    const newTaskList:Task[] = [...tasks, {
      id,//: uuid(),
      title: newTaskTitle,
      isComplete: false
    }]


    setTasks(newTaskList)
  }

  function handleToggleTaskCompletion(id: number) {
    const index = taskIndex(id);
    const allTasks = [...tasks];

    Object.assign(allTasks[index], {
      isComplete: !allTasks[index].isComplete,
    });

    setTasks(allTasks);
  }

  function handleRemoveTask(id: number) {
    const index = taskIndex(id);
    const allTasks = [...tasks];
    allTasks.splice(index, 1);
    setTasks(allTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input 
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}