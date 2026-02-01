import { House } from './house.model';

export interface Resident {
  username: string;
  email: string;
  password: string | null;
  firstName: string;
  lastName: string;
  phone: string;
  companyId: string;
  communityId: number;
  houseDTO: House | null;
  issueIds: number[];
  postId: number[];
  role: string;
  id: number;
}

export interface ResidentsResponse {
  errors: any;
  message: any;
  data: Resident[];
}
