import {Injectable} from '@angular/core';
import {State, Selector, Action, StateContext} from '@ngxs/store';
import {Todo} from '../../shared/models/todo.model';
import {HttpClient} from '@angular/common/http';
import {AddTodo, LoadSeedTodos, RemoveTodo, ToggleTodo} from './todos.actions';
import {uuid} from '../../utils/utility';
import {firstValueFrom} from 'rxjs';

export interface TodosStateModel {
  items: Todo[];
  loading: boolean;
}

@State<TodosStateModel>({
  name: 'todos',
  defaults: {
    items: [], loading: false
  }
})
@Injectable()
export class TodosState {
  constructor(private http: HttpClient) {
  }

  // Selectors
  @Selector() static items(state: TodosStateModel): Todo[] {
    return state.items;
  }

  @Selector() static remaining(state: TodosStateModel): number {
    return state.items.filter(todo => !todo.done).length;
  }

  @Selector() static loading(state: TodosStateModel): boolean {
    return state.loading;
  }

  // Actions
  @Action(AddTodo)
  add(ctx: StateContext<TodosStateModel>, {payload}: AddTodo) {
    const title = payload.trim();
    if (!title) return;
    const id = uuid()
    const state = ctx.getState();
    ctx.setState({
      ...state,
      items: [...state.items, {id, title, done: false}],
    });
  }

  @Action(ToggleTodo)
  toggle(ctx: StateContext<TodosStateModel>, {id}: ToggleTodo) {
    const state = ctx.getState();
    ctx.patchState(
      {
        items: state.items.map(todo => todo.id === id ? {...todo, done: !todo.done} : todo)
      }
    )
  }

  @Action(RemoveTodo)
  remove(ctx: StateContext<TodosStateModel>, {id}: RemoveTodo) {
    const state = ctx.getState();
    ctx.patchState(
      {
        items: state.items.filter(todo => todo.id !== id)
      }
    )
  }

  @Action(LoadSeedTodos)
  async load(ctx: StateContext<TodosStateModel>) {
    ctx.patchState({loading:true})
    try {
      const res: any = await firstValueFrom(
        this.http.get('https://randomuser.me/api/?results=5&seed=ngxs')
      );
      const items: Todo[] = (res.results || []).map((r: any) => ({
        id: r.login.uuid,
        title: `${r.name.first} ${r.name.last}`,
        done: false,
      }));
      ctx.patchState({ items, loading: false });
    } catch (e) {
      ctx.patchState({ loading: false });
    }
  }

}

