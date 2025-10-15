public class Task {
    private int id;
    private String title;
    private boolean done;
    private String createdAt;
    private String deadline;
    private String priority;

    public Task(int id, String title, boolean done, String createdAt, String deadline, String priority) {
        this.id = id;
        this.title = title;
        this.done = done;
        this.createdAt = createdAt;
        this.deadline = deadline;
        this.priority = priority;
    }

    public int getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public boolean isDone() {
        return this.done;
    }

    public String getCreatedAt() {
        return this.createdAt;
    }

    public String getDeadline() {
        return this.deadline;
    }

    public String getPriority() {
        return this.priority;
    }

    public String toJson() {
        return String.format(
            "{\"id\":%d,\"title\":\"%s\",\"done\":%s,\"createdAt\":\"%s\",\"deadline\":\"%s\",\"priority\":\"%s\"}",
            this.id, this.title, this.done, this.createdAt, this.deadline, this.priority
        );
    }
}