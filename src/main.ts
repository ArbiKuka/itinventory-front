import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EmployeeService } from './app/services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { reducers } from './app/store/reducer.index';
import { EmployeeEffects } from './app/store/employee.effects';
import { DeviceEffects } from './app/store/device.effect';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    EmployeeService,
    provideStore(reducers),
    provideEffects([EmployeeEffects, DeviceEffects]),
    importProvidersFrom(StoreDevtoolsModule.instrument(), []),
  ],
}).catch((err) => console.error(err));
