export interface IGeneralResponse<T> {
  data?: T[];
  message: string;
  pagination?: IPagination;
}

export interface IErrorResponse<T> {
  error: string;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}

export interface TableHeader {
  key: string;
  label: string;
}