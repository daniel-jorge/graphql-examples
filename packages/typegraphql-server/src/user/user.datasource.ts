import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { User } from './user.entity';

export class UserDataSource extends RESTDataSource {
  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  willSendRequest(request: RequestOptions) {
    if (this.context.token) {
      request.headers.set('Authorization', this.context.token);
    }
  }

  async getUser(id: number): Promise<User> {
    return this.get(`users/${id}`);
  }

  async getUsers(take?: number, skip?: number): Promise<User[]> {
    const data = await this.get('users', {
      _limit: take,
      _page: skip + 1,
    });
    return data;
  }
}
