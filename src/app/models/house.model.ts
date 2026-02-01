export interface House {
  id: number;
  block: string;
  floor: string;
  number: string;
  type: string;
  communityId: number;
  residents: number[];
  bills: number[];
}

export interface ApiResponse<T> {
  errors: any;
  message: string | null;
  data: T;
}
