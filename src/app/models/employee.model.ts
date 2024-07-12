export interface Employee {
  id?: number;
  name: string;
  email: string;
  devices?: Device[];
}

export interface Device {
  id?: number;
  type: string;
  description: string;
}
