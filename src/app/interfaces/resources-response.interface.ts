export interface ResourcesResponse<T = any> {
  count: number;
  next: string;
  previous: null;
  results: T[];
}
