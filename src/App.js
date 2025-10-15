import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Função para buscar tarefas do backend
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://localhost:8080/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Adicionar nova tarefa
  const addTask = async () => {
    if (!newTask.trim()) return;

    const task = { title: newTask, done: false };

    try {
      const res = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      const savedTask = await res.json();
      setTasks([...tasks, savedTask]);
      setNewTask("");
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // Marcar tarefa como concluída (simulando)
  const toggleDone = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 To-Do List</h1>

        {/* Input e botão */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Nova tarefa..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Adicionar
          </button>
        </div>

        {/* Lista de tarefas */}
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between mb-2 p-2 rounded hover:bg-gray-50"
            >
              <span
                onClick={() => toggleDone(task.id)}
                className={`cursor-pointer ${
                  task.done ? "line-through text-gray-400" : ""
                }`}
              >
                {task.title}
              </span>
              <span
                className={`ml-2 text-sm font-bold ${
                  task.done ? "text-green-500" : "text-gray-300"
                }`}
              >
                {task.done ? "✔" : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
