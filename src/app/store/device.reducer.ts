import { createReducer, on } from '@ngrx/store';
import { Device } from '../models/device.model';
import * as DeviceActions from './device.actions';

export const initialState: Device[] = [];

export const deviceReducer = createReducer(
  initialState,
  on(DeviceActions.loadDevicesSuccess, (state, { devices }) => devices),
  on(DeviceActions.addDevice, (state, { device }) => [...state, device]),
  on(DeviceActions.updateDevice, (state, { device }) =>
    state.map((dev) => (dev.id === device.id ? device : dev))
  ),
  on(DeviceActions.deleteDevice, (state, { id }) =>
    state.filter((dev) => dev.id !== id)
  ),
  on(DeviceActions.assignDevice, (state, { deviceId, employeeId }) =>
    state.map((dev) => (dev.id === deviceId ? { ...dev, employeeId } : dev))
  )
);
