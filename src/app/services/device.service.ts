import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private apiUrl = 'http://localhost:5193/api/devices';

  constructor(private http: HttpClient) {}

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl);
  }

  getDevice(id: number): Observable<Device> {
    return this.http.get<Device>(`${this.apiUrl}/${id}`);
  }

  addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }

  updateDevice(device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${device.id}`, device);
  }

  deleteDevice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
