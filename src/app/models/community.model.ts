export interface Community {
  id: number;
  name: string;
  location?: string;
  companyId?: string;
  houses?: number[];
  users?: number[];
  posts?: any[];
  issues?: any[];
  bills?: number[];
  description?: string; // local UI-only field
}

export interface ApiResponse<T> {
  errors: any;
  message: string | null;
  data: T;
}
