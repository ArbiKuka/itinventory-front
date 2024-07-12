import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Device } from '../../models/device.model';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { MatFormField } from '@angular/material/form-field';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-device-form',
  templateUrl: './device-form.component.html',
  styleUrls: ['./device-form.component.css'],
  standalone: true,
  imports: [FormsModule, NgIf, MatFormField, NgFor],
})
export class DeviceFormComponent {
  @Input() device: Device | null = null;
  @Output() closeForm = new EventEmitter<Device | null>();

  newDevice: Device = {
    type: '',
    description: '',
    employeeId: null,
  };

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    if (this.device) {
      this.newDevice = { ...this.device };
    }
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService
      .getEmployees()
      .subscribe((employees) => (this.employees = employees));
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
