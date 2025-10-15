# 🧠 To-Do List – Back-end em Java Puro + Front-end em HTML/CSS/JS
Um sistema completo de gerenciamento de tarefas com back-end em Java puro e front-end moderno com drag & drop e modo escuro.
Objetivo: Este projeto é ideal para iniciantes que desejam compreender o funcionamento full-stack desde um servidor HTTP simples até uma interface web interativa.

---

## 🚀 Tecnologias Utilizadas

Este projeto foca no uso de recursos nativos e mínimos para demonstrar a base de uma aplicação web:


## Back-end
| Tecnologia | Descrição |
| :--- | :--- |
| **Java 17+** | Linguagem principal do projeto. |
| **HTTPServer** | Módulo nativo do Java para criar e gerenciar o servidor HTTP. |
| **JSON** | Formato de dados para salvar e ler as tarefas no arquivo local. |
| **PowerShell / curl** | Ferramentas de linha de comando para testar as rotas da API. |

## Front-end
| Tecnologia | Descrição |
| :--- | :--- |
| **HTML5** | Estrutura semântica da aplicação. |
| **CSS3** | Estilos com variáveis CSS e gradientes. |
| **JavaScript** | Interatividade e consumo da API. |
| **Drag & Drop API** | Funcionalidade de arrastar tarefas. |
| **Local Storage** | Tema preferido do usuário. |

---

## ⚙️ Funcionalidades


## Back-end
✅ Servidor HTTP na porta 8080
✅ API RESTful para CRUD de tarefas
✅ Persistência em arquivo JSON
✅ CORS configurado para front-end


## Front-end
✅ Modo escuro/claro com toggle
✅ Drag & drop para reorganizar tarefas
✅ Adicionar novas tarefas
✅ Marcar como concluída
✅ Excluir tarefas
✅ Interface responsiva
✅ Persistência do tema preferido

---

## 🧩 Estrutura do projeto
backend/
├── Main.java # Inicia o servidor HTTP
├── Task.java # Modelo da tarefa
├── TaskHandler.java # Lida com requisições HTTP e manipula o JSON
├── tasks.json # Banco de dados local (ignorado no Git)
└── .gitignore # Evita versionar arquivos temporários

frontend/
├── index.html         # Interface principal
├── style.css          # Estilos com temas dark/light
├── script.js          # Lógica e consumo da API
└── drag-drop.js       # Funcionalidade drag & drop


---

## ▶️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/caioegc/todo-backend-java.git
cd todo-backend-java/backend
```

### 2. Execute o Back-end
```bash
cd backend
javac *.java
java Main
```

### 3. Execute o Front-end
```bash
cd frontend
npm start
```

## 📬 Testando as rotas

## ➕ Adicionar uma tarefa
Invoke-RestMethod -Uri http://localhost:8080/tasks -Method POST -Headers @{ "Content-Type"="application/json" } -Body '{"title":"Estudar Java","done":false}'

## 📋 Listar todas as tarefas
Invoke-RestMethod -Uri http://localhost:8080/tasks -Method GET

## 💾 Exemplo de tasks.json
```bash

[
  { "id": 1, "title": "Estudar Java", "done": false },
  { "id": 2, "title": "Ler documentação", "done": true }
]
```

## 🎨 Recursos do Front-end
## Tema Dark/Light
Toggle visual para alternar entre temas

Cores suaves com gradientes

Persistência no localStorage

##  Drag & Drop
Arraste tarefas para reordenar

Feedback visual durante o arrasto

Experiência intuitiva

---
## ✨ Autor
Nome	Caio Eduardo

Formação	Estudante de Sistemas de Informação no IFAL

Interesses	Apaixonado por programação e desenvolvimento de software.

GitHub	🔗 caioegc
---
## 📘 Licença

Este projeto é de uso livre para fins de estudo e aprendizado.

---

Agora só faz isso no terminal:

```powershell
git add README.md
git commit -m "Adicionado README.md com descrição e instruções do projeto"
git push
```
