import {Component, computed, input} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-randomuser-card',
  imports: [CommonModule],
  templateUrl: './randomuser-card.component.html',
  styleUrl: './randomuser-card.component.scss'
})
export class RandomuserCardComponent {
  profile = input<any | null>(null);

  fullName = computed(() => {
    const p = this.profile();
    if (!p) return '';
    if (p.name?.first || p.name?.last) return [p.name?.first, p.name?.last].filter(Boolean).join(' ');
    return p.name || 'Unknown';
  });

  avatar = computed(() => {
    const p = this.profile();
    return p?.picture?.large || p?.avatar || p?.picture?.medium || p?.picture?.thumbnail || 'https://avatars.githubusercontent.com/u/9919?v=4';
  });

  gender = computed(() => {
    const g = (this.profile()?.gender || '').toString().toLowerCase();
    return g ? (g[0].toUpperCase() + g.slice(1)) : '—';
  });

  flag = computed(() => {
    const cc = (this.profile()?.nat || '').toUpperCase();
    const map: Record<string, string> = { IN: '🇮🇳' };
    return map[cc] || '🌐';
  });

  addressLine = computed(() => {
    const loc = this.profile()?.location || {};
    const street = loc.street ? `${loc.street.number ?? ''} ${loc.street.name ?? ''}`.trim() : '';
    const city = loc.city || '';
    const state = loc.state || '';
    const country = loc.country || '';
    const postcode = loc.postcode != null ? String(loc.postcode) : '';
    return [street, city, state, postcode, country].filter(Boolean).join(', ');
  });
}
