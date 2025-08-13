import {Component, computed, effect, signal} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-couter-card',
  imports: [CommonModule],
  templateUrl: './couter-card.component.html',
  styleUrl: './couter-card.component.scss'
})
export class CouterCardComponent {
// writable state
  count = signal(0);

  // derived state (read-only)
  doubled = computed(() => this.count() * 2);

  // side-effect: count বদলালে কনসোলে লগ
  logFx = effect(() => {
    console.log('count changed →', this.count());
  });

  inc() { this.count.update(n => n + 1); }
  dec() { this.count.update(n => n - 1); }
  reset() { this.count.set(0); }
}
