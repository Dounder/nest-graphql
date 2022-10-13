import { StatusArgs } from './dto/args/status.args';
import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { Todo } from './entity/Todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'Piedra del alma', done: false },
    { id: 2, description: 'Piedra del espacio', done: true },
    { id: 3, description: 'Piedra del poder', done: false },
    { id: 4, description: 'Piedra del tiempo', done: false },
  ];

  get totalTodos() {
    return this.todos.length;
  }

  get completedTodos() {
    return this.todos.filter((t) => t.done).length;
  }

  get pendingTodos() {
    return this.todos.filter((t) => !t.done).length;
  }

  findAll(statusArgs: StatusArgs): Todo[] {
    const { status } = statusArgs;

    return status !== undefined
      ? this.todos.filter((t) => t.done === status)
      : this.todos;
  }

  finOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);

    if (!todo) throw new NotFoundException(`Todo with #${id} not found`);

    return todo;
  }

  add(createTodoInput: CreateTodoInput): Todo {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((t) => t.id), 0) + 1;

    this.todos.push(todo);

    return todo;
  }

  update({ description, done, id }: UpdateTodoInput): Todo {
    const todoToUpdate = this.finOne(id);

    if (done !== undefined) todoToUpdate.done = done;
    if (description) todoToUpdate.description = description;

    this.todos = this.todos.map((t) => (t.id === id ? todoToUpdate : t));

    return todoToUpdate;
  }

  remove(id: number): boolean {
    this.finOne(id);
    this.todos = this.todos.filter((t) => t.id !== id);
    return true;
  }
}
