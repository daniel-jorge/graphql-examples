import { RESTDataSource } from 'apollo-datasource-rest';
import { Person } from './person.entity';

export class PersonDatasource extends RESTDataSource {
  constructor(baseURL: string) {
    super();
    this.baseURL = baseURL;
  }

  async getPerson(id: number): Promise<Person | null> {
    const person = await this.get<Person>(`/persons/${id}`);
    return person;
  }
}
