<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
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
✨ Autor
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
>>>>>>> 396045b002974442147409489afa1fb23c666ed8
