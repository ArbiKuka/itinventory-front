import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { employeeReducer } from './store/employee.reducer';
import { deviceReducer } from './store/device.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      employees: employeeReducer,
      devices: deviceReducer,
    }),
    provideStoreDevtools(),
    provideHttpClient(),
    provideAnimations(),
  ],
};
