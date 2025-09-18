type Repository<T> = {
  create(_payload: Omit<T, 'createdAt' | 'id' | 'updatedAt'>): Promise<T>;
  deleteById(_id: number): Promise<number>;
  getAll(): Promise<T[]>;
  getById(_id: number): Promise<null | T>;
  updateById(_id: number, _payload: Partial<T>): Promise<T>;
};

export { type Repository };
