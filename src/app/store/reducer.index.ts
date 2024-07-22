import { ActionReducerMap } from '@ngrx/store';
import { employeeReducer, EmployeeState } from './employee.reducer';
import { deviceReducer } from './device.reducer';
import { Device } from '../models/device.model';

export interface AppState {
  employees: EmployeeState;
  devices: Device[];
}

export const reducers: ActionReducerMap<AppState> = {
  employees: employeeReducer,
  devices: deviceReducer,
};
