import {Component, model} from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  imports: [],
  templateUrl: './custom-checkbox.component.html',
  styleUrl: './custom-checkbox.component.scss'
})
export class CustomCheckboxComponent {
  // parent-এ [(checked)]="agree" করলে দুই-দিকের বাইন্ডিং তৈরি হবে
  checked = model(false);

  toggle(e: Event) {
    const val = (e.target as HTMLInputElement).checked;
    this.checked.set(val); // model() নিজেই Change ইভেন্ট ইমিট করে
  }
}
