import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';

import { Device } from '../../models/device.model';
import { DeviceFormComponent } from '../device-form/device-form.component';
import * as DeviceActions from '../../store/device.actions';
import { selectAllDevices } from '../../store/device.selectors';

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    DeviceFormComponent,
  ],
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.css'],
})
export class DeviceListComponent implements OnInit {
  devices$: Observable<Device[]>;
  filteredDevices$: Observable<Device[]> | undefined;
  searchTerm: string = '';
  displayedColumns: string[] = [
    'id',
    'type',
    'description',
    'employeeId',
    'actions',
  ];
  isFormOpen = false;
  editingDevice: Device | null = null;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {
    this.devices$ = this.store.select(selectAllDevices);
    this.filteredDevices$ = this.devices$;
  }

  ngOnInit(): void {
    this.store.dispatch(DeviceActions.loadDevices());
  }

  filterDevices(): void {
    if (!this.searchTerm) {
      this.filteredDevices$ = this.devices$;
    } else {
      this.filteredDevices$ = this.devices$.pipe(
        map((devices) =>
          devices.filter((device) =>
            device.type.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        )
      );
    }
  }

  openForm(device: Device | null = null): void {
    this.editingDevice = device;
    this.isFormOpen = true;
  }

  closeForm(newDevice: Device | null): void {
    this.isFormOpen = false;
    if (newDevice !== null) {
      if (this.editingDevice) {
        this.updateDevice(newDevice);
      } else {
        this.addDevice(newDevice);
      }
    }
  }

  addDevice(newDevice: Device): void {
    if (newDevice.type && newDevice.description) {
      this.store.dispatch(DeviceActions.addDevice({ device: newDevice }));
    }
  }

  updateDevice(updateDevice: Device): void {
    if (updateDevice.id !== undefined) {
      this.store.dispatch(DeviceActions.updateDevice({ device: updateDevice }));
    }
  }

  onNoClick(): void {
    this.isFormOpen = false;
  }

  deleteDevice(id: number): void {
    this.store.dispatch(DeviceActions.deleteDevice({ id }));
  }
}
