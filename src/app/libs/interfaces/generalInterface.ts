export interface IGeneral<T> {
  data?: T[];
  message: string;
  pagination?: IPagination;
}

export interface IError<T> {
  error: string;
}

export interface IPagination {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
}