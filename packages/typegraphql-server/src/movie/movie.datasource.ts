import { RESTDataSource } from 'apollo-datasource-rest';
import { Movie } from './movie.entity';
import { Person } from 'src/person/person.entity';

interface MoviePerson {
  persons: Person;
}

export class MovieDatasource extends RESTDataSource {
  constructor(baseURL: string) {
    super();
    this.baseURL = baseURL;
  }

  // willSendRequest(request: RequestOptions): void {
  //   request.headers.set('Authorization', this.context.token);
  // }

  getMovie(id: number): Promise<Movie | null> {
    return this.get<Movie | null>(`/movies/${id}`);
  }

  getMovies(): Promise<Movie[]> {
    return this.get<Movie[]>(`/movies`);
  }

  async getMovieDirectors(id: number): Promise<Person[]> {
    const relation = await this.get<MoviePerson[]>(
      `/movies/${id}/directors?_expand=persons`,
    );
    return relation.map(item => item.persons);
  }

  async getMovieActors(id: number): Promise<Person[]> {
    const relation = await this.get<MoviePerson[]>(
      `/movies/${id}/actors?_expand=persons`,
    );
    return relation.map(item => item.persons);
  }
}
