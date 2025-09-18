import { type Abstract as AbstractModel } from './abstract.model.js';
import { type Repository } from './libs/types/types.js';

class Abstract<T extends typeof AbstractModel, K> implements Repository<K> {
  #model: T;

  public constructor(model: T) {
    this.#model = model;
  }

  public create(data: Omit<K, 'createdAt' | 'id' | 'updatedAt'>): Promise<K> {
    return this.#model
      .query()
      .insert(data)
      .returning('*')
      .castTo<K>()
      .execute();
  }

  public deleteById(id: number): Promise<number> {
    return this.#model.query().deleteById(id).execute();
  }

  public getAll(): Promise<K[]> {
    return this.#model.query().castTo<K[]>().execute();
  }

  public async getById(id: number): Promise<K | null> {
    const result = await this.#model
      .query()
      .findById(id)
      .castTo<K | undefined>()
      .execute();

    return result ?? null;
  }

  public updateById(id: number, data: Partial<K>): Promise<K> {
    return this.#model
      .query()
      .patchAndFetchById(id, data)
      .castTo<K>()
      .execute();
  }

  public get model(): T {
    return this.#model;
  }
}

export { Abstract };
