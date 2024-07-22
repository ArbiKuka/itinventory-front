import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Device } from '../../models/device.model';
import { Employee } from '../../models/employee.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as EmployeeActions from '../../store/employee.actions';
import { selectAllEmployees } from '../../store/employee.selectors';

import { MatFormField } from '@angular/material/form-field';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormField],
})
export class DeviceFormComponent {
  @Input() device: Device | null = null;
  @Output() closeForm = new EventEmitter<Device | null>();

  newDevice: Device = {
    type: '',
    description: '',
    employeeId: null,
  };

  employees$: Observable<Employee[]>;

  constructor(private store: Store) {
    this.employees$ = this.store.select(selectAllEmployees);
  }

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());
    if (this.device) {
      this.newDevice = { ...this.device };
    }
  }

  ngOnChanges() {
    if (this.device) {
      this.newDevice = { ...this.device };
    }
  }

  onSubmit() {
    this.closeForm.emit(this.newDevice);
    this.newDevice = {
      type: '',
      description: '',
      employeeId: null,
    };
  }

  close(): void {
    this.closeForm.emit(null);
  }
}
