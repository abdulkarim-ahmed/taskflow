import { describe, expect, it } from "vitest";
import { TaskStore } from "./store";
import { completeTask, createTask, listTasks } from "./tasks";

describe("tasks", () => {
  it("creates and lists open tasks in creation order", () => {
    const store = new TaskStore();
    createTask(store, "write slides");
    createTask(store, "book the room");
    expect(listTasks(store).map((t) => t.title)).toEqual(["write slides", "book the room"]);
  });

  it("hides completed tasks unless asked", () => {
    const store = new TaskStore();
    const t = createTask(store, "ship it");
    completeTask(store, t.id);
    expect(listTasks(store)).toHaveLength(0);
    expect(listTasks(store, { includeDone: true })).toHaveLength(1);
  });

  it("rejects a blank title", () => {
    const store = new TaskStore();
    expect(() => createTask(store, "   ")).toThrow(/title/);
  });
});
