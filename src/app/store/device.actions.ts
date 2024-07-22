import { createAction, props } from '@ngrx/store';
import { Device } from '../models/device.model';

// load devices actions
export const loadDevices = createAction('[Device] Load Devices');
export const loadDevicesSuccess = createAction(
  '[Device] Load Devices Success',
  props<{ devices: Device[] }>()
);
export const loadDevicesFailure = createAction(
  '[Device] Load Devices Failure',
  props<{ error: any }>()
);

// add device actions
export const addDevice = createAction(
  '[Device] Add Device',
  props<{ device: Device }>()
);
export const addDeviceSuccess = createAction(
  '[Device] Add Device Success',
  props<{ device: Device }>()
);
export const addDeviceFailure = createAction(
  '[Device] Add Device Failure',
  props<{ error: any }>()
);

// update device actions
export const updateDevice = createAction(
  '[Device] Update Device',
  props<{ device: Device }>()
);
export const updateDeviceSuccess = createAction(
  '[Device] Update Device Success',
  props<{ device: Device }>()
);
export const updateDeviceFailure = createAction(
  '[Device] Update Device Failure',
  props<{ error: any }>()
);

// delete device actions
export const deleteDevice = createAction(
  '[Device] Delete Device',
  props<{ id: number }>()
);
export const deleteDeviceSuccess = createAction(
  '[Device] Delete Device Success',
  props<{ id: number }>()
);
export const deleteDeviceFailure = createAction(
  '[Device] Delete Device Failure',
  props<{ error: any }>()
);
