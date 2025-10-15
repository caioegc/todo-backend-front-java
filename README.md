# 🧠 To-Do List – Back-end em Java Puro

Um **pequeno sistema de gerenciamento de tarefas (To-Do List)** desenvolvido integralmente em **Java puro**, sem o uso de frameworks. O projeto utiliza recursos nativos do Java para criar um servidor HTTP e gerencia a persistência de dados em um arquivo local (`tasks.json`).

**🎯 Objetivo:** Este projeto é ideal para **iniciantes** que desejam compreender a fundo o funcionamento de um servidor HTTP simples e a lógica de persistência de dados em aplicações Java, sem a abstração de frameworks.

---

## 🚀 Tecnologias Utilizadas

Este projeto foca no uso de recursos nativos e mínimos para demonstrar a base de uma aplicação web:

| Tecnologia | Descrição |
| :--- | :--- |
| **Java 17+** | Linguagem principal do projeto. |
| **HTTPServer** | Módulo nativo do Java para criar e gerenciar o servidor HTTP. |
| **JSON** | Formato de dados para salvar e ler as tarefas no arquivo local. |
| **PowerShell / curl** | Ferramentas de linha de comando para testar as rotas da API. |

---

## ⚙️ Funcionalidades

✅ Adicionar tarefas  
✅ Listar tarefas  
✅ Armazenar no arquivo `tasks.json`  
🕓 Persiste os dados entre execuções  

> Em breve: marcar como concluída e remover tarefa.

---

## 🧩 Estrutura do projeto
backend/
├── Main.java # Inicia o servidor HTTP
├── Task.java # Modelo da tarefa
├── TaskHandler.java # Lida com requisições HTTP e manipula o JSON
├── tasks.json # Banco de dados local (ignorado no Git)
└── .gitignore # Evita versionar arquivos temporários


---

## ▶️ Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/caioegc/todo-backend-java.git
cd todo-backend-java/backend
```

### 2. Compile os arquivos Java
javac Main.java Task.java TaskHandler.java

### 3. Execute o servidor
java Main

O servidor iniciará em:
👉 http://localhost:8080/tasks

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
---
##✨ Autor
Nome	Caio Eduardo

Formação	Estudante de Sistemas de Informação no IFAL

Interesses	Apaixonado por programação e desenvolvimento de software.

GitHub	🔗 Caio Eduardo
---

📘 Licença

Este projeto é de uso livre para fins de estudo e aprendizado.


---

Agora só faz isso no terminal:

```powershell
git add README.md
git commit -m "Adicionado README.md com descrição e instruções do projeto"
git push
```
