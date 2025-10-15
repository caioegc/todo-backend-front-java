import { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import "./App.css";

// Componente SortableTask para drag & drop
function SortableTask({ task, onToggle, onDelete, formatDate, getPriorityColor }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`task-item ${task.done ? 'completed' : ''} ${
        isDragging ? 'dragging' : ''
      }`}
    >
      <div className="task-content">
        <span 
          className="checkbox"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(task.id, task.done);
          }}
        >
          {task.done ? "✅" : "⭕"}
        </span>
        
        <div className="task-details">
          <span className="task-text">{task.title}</span>
          
          <div className="task-meta">
            {task.deadline && (
              <span className="deadline">
                📅 {formatDate(task.deadline)}
              </span>
            )}
            
            <span 
              className="priority-tag"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {task.priority === 'high' && '🔴 Alta'}
              {task.priority === 'medium' && '🟡 Média'}
              {task.priority === 'low' && '🟢 Baixa'}
            </span>
            
            <span className="created-at">
              Criada em: {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
      </div>
      
      <button 
        className="delete-button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task);
        }}
        title="Excluir tarefa"
      >
        🗑️
      </button>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Sensores para drag & drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Drag & Drop - Reordenar tarefas
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.id === active.id);
        const newIndex = tasks.findIndex((task) => task.id === over.id);

        return arrayMove(tasks, oldIndex, newIndex);
      });
    }
  };

  // Carrega tema do localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // Aplica tema ao body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Carrega tarefas do backend
  async function loadTasks() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/tasks");
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error("Erro ao carregar tarefas:", err);
    } finally {
      setLoading(false);
    }
  }

  // Adiciona nova tarefa
  async function addTask() {
    if (!title.trim()) return;
    
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          done: false,
          deadline,
          priority
        }),
      });

      if (response.ok) {
        setTitle("");
        setDeadline("");
        setPriority("medium");
        await loadTasks();
      } else {
        alert("Erro ao adicionar tarefa");
      }
    } catch (err) {
      alert("Servidor não está rodando!");
    } finally {
      setLoading(false);
    }
  }

  // CONFIRMAR DELETE
  const confirmDelete = (task) => {
    setTaskToDelete(task);
    setShowDeleteModal(true);
  };

  // DELETAR APÓS CONFIRMAÇÃO
  const handleDelete = async () => {
    if (!taskToDelete) return;
    
    try {
      const response = await fetch(`http://localhost:8080/tasks/${taskToDelete.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await loadTasks();
        setShowDeleteModal(false);
        setTaskToDelete(null);
      } else {
        alert("Erro ao deletar tarefa");
      }
    } catch (err) {
      console.error("Erro ao deletar tarefa:", err);
      alert("Erro ao conectar com o servidor");
    }
  };

  // CANCELAR DELETE
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  // Marcar/desmarcar como concluída
  async function toggleTask(id, currentDone) {
    try {
      const taskToUpdate = tasks.find(task => task.id === id);
      const response = await fetch(`http://localhost:8080/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: taskToUpdate.title, 
          done: !currentDone,
          deadline: taskToUpdate.deadline,
          priority: taskToUpdate.priority
        })
      });

      if (response.ok) {
        await loadTasks();
      } else {
        alert("Erro ao atualizar tarefa");
      }
    } catch (err) {
      console.error("Erro ao atualizar tarefa:", err);
    }
  }

  // Filtra tarefas
  const filteredTasks = tasks.filter(task => {
    if (filter === "active" && task.done) return false;
    if (filter === "completed" && !task.done) return false;
    
    if (search && !task.title.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  // Carrega tarefas ao abrir a página
  useEffect(() => {
    loadTasks();
  }, []);

  // Enter para adicionar tarefa
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Formata data
  const formatDate = (dateString) => {
    if (!dateString) return "";
    
    try {
      const date = new Date(dateString + 'T12:00:00');
      return date.toLocaleDateString('pt-BR');
    } catch (error) {
      return dateString;
    }
  };

  // Cor da prioridade
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high": return "#ff4444";
      case "medium": return "#ffaa00";
      case "low": return "#44ff44";
      default: return "#666";
    }
  };

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1 className="title">🚀 To-Do List PRO</h1>
          <p className="subtitle">Sistema profissional de gerenciamento de tarefas</p>
          <button 
            className="theme-toggle"
            onClick={toggleDarkMode}
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </header>

        {/* 🔍 BARRA DE PESQUISA E FILTROS */}
        <div className="controls-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Pesquisar tarefas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filters">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Todas ({tasks.length})
            </button>
            <button 
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Pendentes ({tasks.filter(t => !t.done).length})
            </button>
            <button 
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Concluídas ({tasks.filter(t => t.done).length})
            </button>
          </div>
        </div>

        {/* ➕ FORMULÁRIO DE NOVA TAREFA */}
        <div className="input-section">
          <input
            className="task-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="📝 Digite uma nova tarefa..."
            disabled={loading}
          />
          
          <input
            type="date"
            className="date-input"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
          
          <select 
            className="priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">🟢 Baixa</option>
            <option value="medium">🟡 Média</option>
            <option value="high">🔴 Alta</option>
          </select>
          
          <button 
            className="add-button" 
            onClick={addTask}
            disabled={loading || !title.trim()}
          >
            {loading ? "⏳" : "➕ Adicionar"}
          </button>
        </div>

        {loading && <div className="loading">Carregando...</div>}

        {/* 📋 LISTA DE TAREFAS COM DRAG & DROP */}
        <div className="tasks-section">
          <h2 className="tasks-title">
            {filter === 'all' && 'Todas as Tarefas'}
            {filter === 'active' && 'Tarefas Pendentes'}
            {filter === 'completed' && 'Tarefas Concluídas'}
            {search && ` - Buscando: "${search}"`}
            <span className="tasks-count"> ({filteredTasks.length})</span>
          </h2>
          
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p>🎉 {search ? 'Nenhuma tarefa encontrada!' : 'Nenhuma tarefa!'}</p>
              <p>{search ? 'Tente outra busca.' : 'Adicione uma nova tarefa acima.'}</p>
            </div>
          ) : (
            <>
              <div className="drag-instruction">
                💡 Arraste as tarefas para reordenar
              </div>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext items={filteredTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                  <ul className="tasks-list">
                    {filteredTasks.map((task) => (
                      <SortableTask
                        key={task.id}
                        task={task}
                        onToggle={toggleTask}
                        onDelete={confirmDelete}
                        formatDate={formatDate}
                        getPriorityColor={getPriorityColor}
                      />
                    ))}
                  </ul>
                </SortableContext>
              </DndContext>
            </>
          )}
        </div>

        {/* 📊 FOOTER COM ESTATÍSTICAS */}
        <footer className="footer">
          <div className="stats">
            <span>Total: {tasks.length}</span>
            <span>Pendentes: {tasks.filter(t => !t.done).length}</span>
            <span>Concluídas: {tasks.filter(t => t.done).length}</span>
            <span>Alta prioridade: {tasks.filter(t => t.priority === 'high').length}</span>
          </div>
        </footer>

        {/* MODAL DE CONFIRMAÇÃO DE DELETE */}
        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="delete-modal">
              <div className="modal-header">
                <h3>🗑️ Confirmar Exclusão</h3>
              </div>
              <div className="modal-body">
                <p>Tem certeza que deseja excluir a tarefa:</p>
                <p className="task-to-delete">"{taskToDelete?.title}"</p>
                <p className="warning-text">Esta ação não pode ser desfeita!</p>
              </div>
              <div className="modal-actions">
                <button 
                  className="cancel-btn"
                  onClick={cancelDelete}
                >
                  Cancelar
                </button>
                <button 
                  className="delete-confirm-btn"
                  onClick={handleDelete}
                >
                  Sim, Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;