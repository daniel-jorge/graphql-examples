import { InputType, Field } from 'type-graphql';
import { File } from './file.entity';
import { Readable } from 'stream';

@InputType()
export class FileInput implements Partial<File> {
  @Field()
  stream: Readable;

  @Field()
  filename: string;

  @Field()
  mimetype: string;

  @Field()
  encoding: string;
}
