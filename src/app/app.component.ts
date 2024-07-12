import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { UploadSvgComponent } from './svg-icons/upload-svg.component';
import { ExportSvgComponent } from './svg-icons/export-svg.component';
import { BellSvgComponent } from './svg-icons/bell-svg.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SideBarComponent,
    EmployeeListComponent,
    UploadSvgComponent,
    ExportSvgComponent,
    BellSvgComponent,
    DeviceListComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  view: string = 'employees';

  toggleView(view: string): void {
    this.view = view;
    if (view === 'devices') {
      console.log('devices');
    }
    if (view === 'employees') {
      console.log('employees');
    }
  }

  title = 'IT Inventory Manager';
}
