import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Post } from './post.entity';

export class PostDataSource extends RESTDataSource {
  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  willSendRequest(request: RequestOptions) {
    if (this.context.token) {
      request.headers.set('Authorization', this.context.token);
    }
  }

  async getPost(id: number): Promise<Post> {
    return this.get(`posts/${id}`);
  }

  async getPosts(take?: number, skip?: number): Promise<Post[]> {
    const data = await this.get('posts', {
      _limit: take,
      _page: skip + 1,
    });
    return data;
  }

  async getPostsByUserId(userId: number, take?: number, skip?: number): Promise<Post[]> {
    const data = await this.get('posts', {
      _limit: take,
      _page: skip + 1,
      'field[userId]': userId,
    });
    return data;
  }
}
