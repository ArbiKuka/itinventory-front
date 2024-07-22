import { createReducer, on, Action } from '@ngrx/store';
import { Device } from '../models/device.model';
import * as DeviceActions from './device.actions';

export const initialState: Device[] = [];

export const deviceReducer = createReducer(
  initialState,
  on(DeviceActions.loadDevicesSuccess, (state, { devices }) => devices),
  on(DeviceActions.loadDevicesFailure, (state, { error }) => {
    console.error('Load devices failed', error);
    return state;
  }),
  on(DeviceActions.addDeviceSuccess, (state, { device }) => [...state, device]),
  on(DeviceActions.updateDeviceSuccess, (state, { device }) =>
    state.map((dev) => (dev.id === device.id ? device : dev))
  ),
  on(DeviceActions.deleteDeviceSuccess, (state, { id }) =>
    state.filter((dev) => dev.id !== id)
  ),
  on(DeviceActions.addDeviceFailure, (state, { error }) => {
    console.error('Add device failed', error);
    return state;
  }),
  on(DeviceActions.updateDeviceFailure, (state, { error }) => {
    console.error('Update device failed', error);
    return state;
  }),
  on(DeviceActions.deleteDeviceFailure, (state, { error }) => {
    console.error('Delete device failed', error);
    return state;
  })
);

export function reducer(state: Device[] | undefined, action: Action) {
  return deviceReducer(state, action);
}
