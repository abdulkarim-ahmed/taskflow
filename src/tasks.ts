import type { Task } from "./types";
import type { TaskStore } from "./store";

export function createTask(store: TaskStore, title: string, dueAt?: number): Task {
  const clean = title.trim();
  if (clean.length === 0) throw new Error("title is required");
  return store.add(clean, dueAt);
}

export function completeTask(store: TaskStore, id: string): Task {
  const task = store.get(id);
  if (!task) throw new Error(`no task ${id}`);
  task.done = true;
  return task;
}

export function listTasks(store: TaskStore, opts: { includeDone?: boolean } = {}): Task[] {
  const all = store.all().sort((a, b) => a.createdAt - b.createdAt);
  return opts.includeDone ? all : all.filter((t) => !t.done);
}

// Returns tasks whose due date falls within the given window, soonest first,
// so the UI can surface a "coming up" list.
export function dueSoon(store: TaskStore, withinMs: number): Task[] {
  const now = Date.now();
  return store
    .all()
    .filter((t) => t.dueAt !== undefined && t.dueAt - now <= withinMs)
    .sort((a, b) => (a.dueAt ?? 0) - (b.dueAt ?? 0));
}
