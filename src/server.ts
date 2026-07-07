import express from "express";
import { TaskStore } from "./store";
import { completeTask, createTask, listTasks } from "./tasks";

const store = new TaskStore();
const app = express();
app.use(express.json());

app.get("/tasks", (req, res) => {
  const includeDone = req.query.includeDone === "true";
  res.json(listTasks(store, { includeDone }));
});

app.post("/tasks", (req, res) => {
  try {
    const { title, dueAt } = req.body ?? {};
    const task = createTask(store, String(title ?? ""), typeof dueAt === "number" ? dueAt : undefined);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: (err as Error).message });
  }
});

app.post("/tasks/:id/complete", (req, res) => {
  try {
    res.json(completeTask(store, req.params.id));
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`taskflow listening on :${port}`));
