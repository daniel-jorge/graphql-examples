import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { Comment } from './comment.entity';

export class CommentDataSource extends RESTDataSource {
  constructor(baseUrl: string) {
    super();
    this.baseURL = baseUrl;
  }

  willSendRequest(request: RequestOptions) {
    if (this.context.token) {
      request.headers.set('Authorization', this.context.token);
    }
  }

  async getComment(id: number): Promise<Comment> {
    return this.get(`comments/${id}`);
  }

  async getComments(take?: number, skip?: number): Promise<Comment[]> {
    const data = await this.get('comments', {
      _limit: take,
      _page: skip + 1,
    });
    return data;
  }

  async getCommentByPostId(postId: number, take?: number, skip?: number): Promise<Comment[]> {
    const data = await this.get('comments', {
      _limit: take,
      _page: skip + 1,
      'field[postId]': postId,
    });
    return data;
  }
}
