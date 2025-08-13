export class AddTodo {
  static readonly type = '[Todos] Add';
  constructor(public payload: string) {}
}
export class ToggleTodo {
  static readonly type = '[Todos] Toggle';
  constructor(public id: string) {}
}
export class RemoveTodo {
  static readonly type = '[Todos] Remove';
  constructor(public id: string) {}
}
export class LoadSeedTodos {
  static readonly type = '[Todos] Load Seed';
}
