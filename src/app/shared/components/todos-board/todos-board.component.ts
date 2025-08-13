import {Component, Signal, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {Store} from '@ngxs/store';
import {AddTodo, LoadSeedTodos, RemoveTodo, ToggleTodo} from '../../../states/todos/todos.actions';
import {TodosState} from '../../../states/todos/todos.state';
import {Todo} from '../../models/todo.model';

@Component({
  selector: 'app-todos-board',
  imports: [CommonModule, FormsModule],
  templateUrl: './todos-board.component.html',
  styleUrl: './todos-board.component.scss'
})
export class TodosBoardComponent {
  title = signal('');
  items: Signal<Todo[]>;
  remaining: Signal<number>;
  loading: Signal<boolean>;
  constructor(private store: Store) {}




  ngOnInit() {
    this.items = toSignal(this.store.select(TodosState.items), { initialValue: [] });
    this.remaining = toSignal(this.store.select(TodosState.remaining), { initialValue: 0 });
    this.loading = toSignal(this.store.select(TodosState.loading), { initialValue: false });
  }

  add() { const v = this.title().trim(); if (!v) return; this.store.dispatch(new AddTodo(v)); this.title.set(''); }
  toggle(id: string) { this.store.dispatch(new ToggleTodo(id)); }
  remove(id: string) { this.store.dispatch(new RemoveTodo(id)); }
  load() { this.store.dispatch(new LoadSeedTodos()); }

}
