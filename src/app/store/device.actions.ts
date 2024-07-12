import { createAction, props } from '@ngrx/store';
import { Device } from '../models/device.model';

export const loadDevices = createAction('[Device] Load Devices');
export const loadDevicesSuccess = createAction(
  '[Device] Load Devices Success',
  props<{ devices: Device[] }>()
);
export const addDevice = createAction(
  '[Device] Add Device',
  props<{ device: Device }>()
);
export const updateDevice = createAction(
  '[Device] Update Device',
  props<{ device: Device }>()
);
export const deleteDevice = createAction(
  '[Device] Delete Device',
  props<{ id: number }>()
);
export const assignDevice = createAction(
  '[Device] Assign Device',
  props<{ deviceId: number; employeeId: number }>()
);
