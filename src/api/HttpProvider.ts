interface HttpProvider {
  get<T>(url: string, headers?: Record<string, unknown>): Promise<T>;
}

export default HttpProvider;
