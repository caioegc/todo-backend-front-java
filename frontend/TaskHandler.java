import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class TaskHandler implements HttpHandler {

    private static List<Task> tasks = new ArrayList<>();
    private static int nextId = 1;
    private static final String FILE_NAME = "tasks.json";

    // Carrega as tarefas do arquivo
    static {
        try {
            File file = new File(FILE_NAME);
            if (file.exists()) {
                BufferedReader br = new BufferedReader(new FileReader(file));
                String line, json = "";
                while ((line = br.readLine()) != null) {
                    json += line;
                }
                br.close();
                if (!json.equals("[]") && !json.isEmpty()) {
                    String[] items = json.replace("[", "").replace("]", "").split("\\},\\{");
                    for (int i = 0; i < items.length; i++) {
                        String item = items[i];
                        if (!item.startsWith("{")) item = "{" + item;
                        if (!item.endsWith("}")) item = item + "}";
                        int id = Integer.parseInt(item.split("\"id\":")[1].split(",")[0]);
                        String title = item.split("\"title\":\"")[1].split("\"")[0];
                        boolean done = Boolean.parseBoolean(item.split("\"done\":")[1].split("}")[0]);
                        tasks.add(new Task(id, title, done));
                        if (id >= nextId) nextId = id + 1;
                    }
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        String method = exchange.getRequestMethod();

        if (method.equalsIgnoreCase("POST")) {
            String body = new String(exchange.getRequestBody().readAllBytes());
            String title = body.split("\"title\":\"")[1].split("\"")[0];
            boolean done = Boolean.parseBoolean(body.split("\"done\":")[1].split("}")[0]);

            Task task = new Task(nextId++, title, done);
            tasks.add(task);

            // Salva no arquivo
            saveTasks();

            String response = "{\"status\":\"Tarefa adicionada!\"}";
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();

        } else if (method.equalsIgnoreCase("GET")) {
            StringBuilder sb = new StringBuilder();
            sb.append("[");
            for (int i = 0; i < tasks.size(); i++) {
                sb.append(tasks.get(i).toJson());
                if (i < tasks.size() - 1) sb.append(",");
            }
            sb.append("]");

            String response = sb.toString();
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
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
            e.printStackTrace();
        }
    }
}
