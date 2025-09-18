import { ServerErrorType, StorageKey } from '~/libs/enums/enums.js';
import { type ServerErrorResponse, type ValueOf } from '~/libs/types/types.js';

import { type StorageApi } from '../storage/storage.js';
import { type HTTPCode } from './libs/enums/enums.js';
import { HttpHeader, HTTPMethod } from './libs/enums/enums.js';
import { HTTPError } from './libs/exceptions/exceptions.js';
import { getStringifiedQuery } from './libs/helpers/helpers.js';
import { type HttpApi, type HttpOptions } from './libs/types/types.js';

type Constructor = {
  storageApi: StorageApi;
};

class Http implements HttpApi {
  #getUrl = <T extends Record<string, unknown>>(
    url: string,
    query: T | undefined
  ): string => {
    if (query) {
      return `${url}?${getStringifiedQuery(query)}`;
    }

    return url;
  };

  #handleError = async (response: Response): Promise<never> => {
    let parsedException: ServerErrorResponse;

    try {
      parsedException = (await response.json()) as ServerErrorResponse;
    } catch {
      parsedException = {
        errorType: ServerErrorType.COMMON,
        message: response.statusText
      };
    }

    const isCustomException = Boolean(parsedException.errorType);

    throw new HTTPError({
      details: 'details' in parsedException ? parsedException.details : [],
      errorType: isCustomException
        ? parsedException.errorType
        : ServerErrorType.COMMON,
      message: parsedException.message,
      status: response.status as ValueOf<typeof HTTPCode>
    });
  };

  #parseJSON = <T>(response: Response): Promise<T> => {
    return response.json() as Promise<T>;
  };

  #storageApi: StorageApi;

  public constructor({ storageApi }: Constructor) {
    this.#storageApi = storageApi;
  }

  async #checkResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      await this.#handleError(response);
    }

    return await this.#parseJSON(response);
  }

  #getHeaders({
    contentType,
    hasAuth
  }: Partial<Pick<HttpOptions, 'contentType' | 'hasAuth'>>): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this.#storageApi.get(StorageKey.TOKEN);

      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  public async load<T>(
    url: string,
    options: Partial<HttpOptions> = {}
  ): never | Promise<T> {
    const {
      contentType,
      hasAuth = true,
      method = HTTPMethod.GET,
      payload = null,
      query
    } = options;
    const headers = this.#getHeaders({
      contentType,
      hasAuth
    });

    const response = await fetch(this.#getUrl(url, query), {
      body: payload,
      headers,
      method
    });

    return (await this.#checkResponse(response)) as T;
  }
}

export { Http };
