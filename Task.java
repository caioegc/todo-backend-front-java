public class Task {
    private int id;
    private String title;
    private boolean done;

    public Task(int id, String title, boolean done) {
        this.id = id;
        this.title = title;
        this.done = done;
    }

    public int getId() { return id; }
    public String getTitle() { return title; }
    public boolean isDone() { return done; }

    // Gera JSON da task
    public String toJson() {
        return String.format("{\"id\":%d,\"title\":\"%s\",\"done\":%s}", id, title, done);
    }
}
