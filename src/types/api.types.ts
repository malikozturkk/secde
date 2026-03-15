export interface ApiError {
  code: number;
  message: string;
  attachment: unknown | null;
}

export interface ApiResponse<T = null> {
  date: number;
  success: boolean;
  data: T | null;
  error: ApiError | null;
}
