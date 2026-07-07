import { randomUUID } from "node:crypto";
import type { Task } from "./types";

export class TaskStore {
  private tasks = new Map<string, Task>();

  add(title: string, dueAt?: number): Task {
    const task: Task = {
      id: randomUUID(),
      title,
      done: false,
      createdAt: Date.now(),
      ...(dueAt !== undefined ? { dueAt } : {}),
    };
    this.tasks.set(task.id, task);
    return task;
  }

  get(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  all(): Task[] {
    return [...this.tasks.values()];
  }

  remove(id: string): boolean {
    return this.tasks.delete(id);
  }
}
