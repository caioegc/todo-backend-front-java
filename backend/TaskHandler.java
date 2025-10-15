import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TaskHandler implements HttpHandler {

    private static List<Task> tasks = new ArrayList<>();
    private static int nextId = 1;
    private static final String FILE_NAME = "tasks.json";

    // Carrega as tarefas do arquivo
    static {
        loadTasksFromFile();
    }

    private static void loadTasksFromFile() {
        try {
            File file = new File(FILE_NAME);
            tasks.clear();
            nextId = 1;

            if (!file.exists()) return;

            BufferedReader br = new BufferedReader(new FileReader(file));
            String json = "";
            String line;
            while ((line = br.readLine()) != null) json += line;
            br.close();

            // 🔄 ATUALIZADO: Regex para pegar todos os campos
            Pattern pattern = Pattern.compile("\\{\"id\":(\\d+),\"title\":\"(.*?)\",\"done\":(true|false),\"createdAt\":\"(.*?)\",\"deadline\":\"(.*?)\",\"priority\":\"(.*?)\"\\}");
            Matcher matcher = pattern.matcher(json);

            while (matcher.find()) {
                int id = Integer.parseInt(matcher.group(1));
                String title = matcher.group(2);
                boolean done = Boolean.parseBoolean(matcher.group(3));
                String createdAt = matcher.group(4);
                String deadline = matcher.group(5);
                String priority = matcher.group(6);
                
                tasks.add(new Task(id, title, done, createdAt, deadline, priority));
                if (id >= nextId) nextId = id + 1;
            }
        } catch (Exception e) {
            System.err.println("Erro ao carregar tasks do arquivo: " + e.getMessage());
        }
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();
        String path = exchange.getRequestURI().getPath();

        // 🔓 Libera CORS
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS, DELETE, PUT");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

        // ⚙️ Navegador manda OPTIONS antes de alguns métodos
        if (method.equalsIgnoreCase("OPTIONS")) {
            exchange.sendResponseHeaders(204, -1);
            return;
        }

        // 🗑️ DELETE - /tasks/{id}
        if (method.equalsIgnoreCase("DELETE")) {
            String[] pathParts = path.split("/");
            if (pathParts.length == 3) {
                try {
                    int taskId = Integer.parseInt(pathParts[2]);
                    boolean removed = tasks.removeIf(task -> task.getId() == taskId);
                    
                    if (removed) {
                        saveTasks();
                        String response = "{\"status\":\"Tarefa deletada!\"}";
                        sendResponse(exchange, 200, response);
                    } else {
                        sendResponse(exchange, 404, "{\"error\":\"Tarefa não encontrada\"}");
                    }
                } catch (NumberFormatException e) {
                    sendResponse(exchange, 400, "{\"error\":\"ID inválido\"}");
                }
            }
            return;
        }

        // ✏️ PUT - /tasks/{id} (atualizar tarefa)
        if (method.equalsIgnoreCase("PUT")) {
            String[] pathParts = path.split("/");
            if (pathParts.length == 3) {
                try {
                    int taskId = Integer.parseInt(pathParts[2]);
                    String body = new String(exchange.getRequestBody().readAllBytes());
                    
                    // Encontra a tarefa
                    Task taskToUpdate = null;
                    for (Task task : tasks) {
                        if (task.getId() == taskId) {
                            taskToUpdate = task;
                            break;
                        }
                    }
                    
                    if (taskToUpdate != null) {
                        // 🔄 ATUALIZADO: Extrai todos os campos
                        Pattern pTitle = Pattern.compile("\"title\":\"(.*?)\"");
                        Pattern pDone = Pattern.compile("\"done\":(true|false)");
                        Pattern pDeadline = Pattern.compile("\"deadline\":\"(.*?)\"");
                        Pattern pPriority = Pattern.compile("\"priority\":\"(.*?)\"");
                        
                        Matcher mTitle = pTitle.matcher(body);
                        Matcher mDone = pDone.matcher(body);
                        Matcher mDeadline = pDeadline.matcher(body);
                        Matcher mPriority = pPriority.matcher(body);
                        
                        if (mTitle.find()) {
                            // Cria nova task com dados atualizados
                            boolean newDone = mDone.find() ? Boolean.parseBoolean(mDone.group(1)) : taskToUpdate.isDone();
                            String newDeadline = mDeadline.find() ? mDeadline.group(1) : taskToUpdate.getDeadline();
                            String newPriority = mPriority.find() ? mPriority.group(1) : taskToUpdate.getPriority();
                            
Task updatedTask = new Task(taskId, mTitle.group(1), newDone, taskToUpdate.getCreatedAt(), newDeadline, newPriority);                            
                            // Substitui na lista
                            tasks.removeIf(task -> task.getId() == taskId);
                            tasks.add(updatedTask);
                            saveTasks();
                            
                            sendResponse(exchange, 200, updatedTask.toJson());
                        } else {
                            sendResponse(exchange, 400, "{\"error\":\"Título é obrigatório\"}");
                        }
                    } else {
                        sendResponse(exchange, 404, "{\"error\":\"Tarefa não encontrada\"}");
                    }
                } catch (NumberFormatException e) {
                    sendResponse(exchange, 400, "{\"error\":\"ID inválido\"}");
                }
            }
            return;
        }

        // ➕ POST - /tasks (criar nova tarefa)
if (method.equalsIgnoreCase("POST")) {
    String body = new String(exchange.getRequestBody().readAllBytes());

    // Extrai todos os campos
    String title = "";
    boolean done = false;
    String createdAt = java.time.LocalDate.now(java.time.ZoneId.of("America/Sao_Paulo")).toString();
    String deadline = "";
    String priority = "medium";

    Pattern pTitle = Pattern.compile("\"title\":\"(.*?)\"");
    Matcher mTitle = pTitle.matcher(body);
    if (mTitle.find()) title = mTitle.group(1);

    Pattern pDone = Pattern.compile("\"done\":(true|false)");
    Matcher mDone = pDone.matcher(body);
    if (mDone.find()) done = Boolean.parseBoolean(mDone.group(1));

    Pattern pDeadline = Pattern.compile("\"deadline\":\"(.*?)\"");
    Matcher mDeadline = pDeadline.matcher(body);
    if (mDeadline.find()) deadline = mDeadline.group(1);

    Pattern pPriority = Pattern.compile("\"priority\":\"(.*?)\"");
    Matcher mPriority = pPriority.matcher(body);
    if (mPriority.find()) priority = mPriority.group(1);

    // ✅ CORRETO: SEM ASPAS!
    Task task = new Task(nextId++, title, done, createdAt, deadline, priority);
    tasks.add(task);
    saveTasks();

    String response = task.toJson();
    sendResponse(exchange, 201, response);
    return;
}

        // 📋 GET - /tasks (listar todas tarefas)
        if (method.equalsIgnoreCase("GET")) {
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < tasks.size(); i++) {
                sb.append(tasks.get(i).toJson());
                if (i < tasks.size() - 1) sb.append(",");
            }
            sb.append("]");

            String response = sb.toString();
            sendResponse(exchange, 200, response);
            return;
        }

        // ❌ Método não suportado
        sendResponse(exchange, 405, "{\"error\":\"Método não suportado\"}");
    }

    // 🎯 Método auxiliar para enviar respostas
    private void sendResponse(HttpExchange exchange, int statusCode, String response) throws IOException {
        exchange.getResponseHeaders().add("Content-Type", "application/json");
        exchange.sendResponseHeaders(statusCode, response.getBytes().length);
        OutputStream os = exchange.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }

    private void saveTasks() {
        try {
            BufferedWriter bw = new BufferedWriter(new FileWriter(FILE_NAME));
            bw.write("[");
            for (int i = 0; i < tasks.size(); i++) {
                bw.write(tasks.get(i).toJson());
                if (i < tasks.size() - 1) bw.write(",");
            }
            bw.write("]");
            bw.close();
        } catch (IOException e) {
            System.err.println("Erro ao salvar tarefas: " + e.getMessage());
        }
    }
}