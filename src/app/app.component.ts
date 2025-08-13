import {Component, effect, model, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {CommonModule} from '@angular/common';
import {User} from './shared/models/user.model';
import {CustomCheckboxComponent} from './shared/components/custom-checkbox/custom-checkbox.component';
import {SearchBoxComponent} from './shared/components/search-box/search-box.component';
import {CouterCardComponent} from './shared/components/couter-card/couter-card.component';
import {RandomuserCardComponent} from './shared/components/randomuser-card/randomuser-card.component';
import {TodosBoardComponent} from './shared/components/todos-board/todos-board.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, CustomCheckboxComponent, SearchBoxComponent, CouterCardComponent, RandomuserCardComponent, TodosBoardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'signal-practice';
  selected = signal<User | null>(null);
  agree = model(false);

  onSelect(u: User) { this.selected.set(u); }
  logFx = effect(() => console.log('Selected changed →', this.selected()));

  DEMO_PROFILE = {
    gender: 'male',
    name: { title: 'Mr', first: 'Neel', last: 'Prajapati' },
    location: {
      street: { number: 2, name: 'Rajaji Salai' },
      city: 'Vijayanagaram', state: 'Chandigarh', country: 'India', postcode: 68745,
      timezone: { offset: '-12:00', description: 'Eniwetok, Kwajalein' },
    },
    email: 'neel.prajapati@example.com',
    login: { uuid: 'aa00af2a-589f-481f-8480-94608517d214' },
    phone: '8304810392', cell: '7911400110',
    picture: {
      large: 'https://randomuser.me/api/portraits/men/5.jpg',
      medium: 'https://randomuser.me/api/portraits/med/men/5.jpg',
      thumbnail: 'https://randomuser.me/api/portraits/thumb/men/5.jpg',
    },
    nat: 'IN',
  } as const;
}
