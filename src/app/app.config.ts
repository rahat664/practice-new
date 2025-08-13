import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

import { provideStore } from '@ngxs/store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsFormPlugin } from '@ngxs/form-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsRouterPlugin } from '@ngxs/router-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';

// Example state (replace with your real states)
import {TodosState} from './states/todos/todos.state';

// Toggle these with your real environment
const isDev = true;

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),

    // Root store + plugins. Storage first so rehydration happens before others.
    provideStore(
      [TodosState],                                      // <-- your states here
      withNgxsStoragePlugin({ keys: '*' }),                // persist everything (or ['example'])
      withNgxsRouterPlugin(),
      withNgxsFormPlugin(),
      withNgxsWebSocketPlugin({ url: 'ws://localhost:4200' }),
      ...(isDev ? [withNgxsReduxDevtoolsPlugin(), withNgxsLoggerPlugin()] : [])
    )
  ]
};
