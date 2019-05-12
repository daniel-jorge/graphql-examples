import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { {{entityClass}} } from './{{entity}}.entity';

export class {{entityClass}}DataSource extends RESTDataSource {
  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  willSendRequest(request: RequestOptions) {
    if (this.context.token) {
      request.headers.set('Authorization', this.context.token);
    }
  }

  async get{{entityClass}}(id: number): Promise<{{entityClass}}> {
    return this.get(`{{entityInstance}}s/${id}`);
  }

  async get{{entityClass}}s(limit: number = 5): Promise<{{entityClass}}[]> {
    const data = await this.get('{{entityInstance}}s', {
      _limit: limit,
    });
    return data;
  }
}
