import {Component, computed, inject, output, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {catchError, debounceTime, distinctUntilChanged, map, of, switchMap} from 'rxjs';
import {User} from '../../models/user.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-search-box',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.scss'
})
export class SearchBoxComponent {
  private http = inject(HttpClient);
  query = signal('');

  users = toSignal(
    this.http
      .get<{ results: any[] }>('https://randomuser.me/api/?results=50&seed=ng-signals-demo')
      .pipe(
        map((res) =>
          res.results.map((r: any) => ({
            id: r.login.uuid,
            name: `${r.name.first} ${r.name.last}`,
            email: r.email,
            avatar: r.picture?.thumbnail,
          }) as User)
        ),
        catchError(() => of([] as User[]))
      ),
    { initialValue: [] as User[] }
  );

  results = computed(() => {
    const s = this.query().trim().toLowerCase();
    const list = this.users();
    return s
      ? list.filter((u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s))
      : [];
  });

  selectedUser = output<User>();
  select(u: User) { this.selectedUser.emit(u); }
}
