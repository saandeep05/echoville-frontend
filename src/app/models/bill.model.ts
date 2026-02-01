import { House } from "./house.model";

export enum BillStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  OVERDUE = 'OVERDUE'
}

export interface Bill {
  id: number;
  amount: number;
  dueDate: string;
  houseDTO: House;
  communityId: number;
  title: string;
  description: string | null;
  status: BillStatus | string;
  houseId?: number; // for bill creation
}

export interface BillsResponse {
  errors: any;
  message: any;
  data: Bill[];
}
