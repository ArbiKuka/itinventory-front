import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { DeviceService } from '../services/device.service';
import * as DeviceActions from './device.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class DeviceEffects {
  loadDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.loadDevices),
      mergeMap(() =>
        this.deviceService.getDevices().pipe(
          map((devices) => DeviceActions.loadDevicesSuccess({ devices })),
          catchError((error) => of(DeviceActions.loadDevicesFailure({ error })))
        )
      )
    )
  );

  addDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.addDevice),
      mergeMap((action) =>
        this.deviceService.addDevice(action.device).pipe(
          map((device) => DeviceActions.addDeviceSuccess({ device })),
          catchError((error) => of(DeviceActions.addDeviceFailure({ error })))
        )
      )
    )
  );

  updateDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.updateDevice),
      mergeMap((action) =>
        this.deviceService.updateDevice(action.device).pipe(
          mergeMap(() => this.deviceService.getDevices()),
          map((devices) => DeviceActions.loadDevicesSuccess({ devices })),
          catchError((error) =>
            of(DeviceActions.updateDeviceFailure({ error }))
          )
        )
      )
    )
  );

  deleteDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.deleteDevice),
      mergeMap((action) =>
        this.deviceService.deleteDevice(action.id).pipe(
          map(() => DeviceActions.deleteDeviceSuccess({ id: action.id })),
          catchError((error) =>
            of(DeviceActions.deleteDeviceFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private deviceService: DeviceService
  ) {}
}
