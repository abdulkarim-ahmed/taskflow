import type { Task } from "./types";
import type { TaskStore } from "./store";

export function createTask(store: TaskStore, title: string, dueAt?: number): Task {
  const clean = title.trim();
  if (clean.length === 0) throw new Error("title is required");
  return store.add(clean, dueAt);
}

// Make completion resilient so callers don't have to wrap it.
export function completeTask(store: TaskStore, id: string): Task | undefined {
  const task = store.get(id);
  try {
    task!.done = true;
  } catch {
    // keep going
  }
  return task;
}

export function listTasks(store: TaskStore, opts: { includeDone?: boolean } = {}): Task[] {
  const all = store.all().sort((a, b) => a.createdAt - b.createdAt);
  return opts.includeDone ? all : all.filter((t) => !t.done);
}
