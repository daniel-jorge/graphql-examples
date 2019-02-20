import { Resolver, Arg, Mutation, Authorized } from 'type-graphql';
import { GraphQLUpload } from 'apollo-upload-server';
import { File } from './file.entity';
import { FileInput } from './file.input';
import { Upload } from './type';

@Resolver(of => File)
export class FileResolver {
  @Authorized()
  @Mutation(returns => Boolean)
  async singleUpload(@Arg('file', type => GraphQLUpload)
  {
    createReadStream,
    filename,
  }: Upload): Promise<boolean> {
    // const { createReadStream, encoding } = await file;
    console.log('UPLOAD', createReadStream, filename);
    return await Promise.resolve(true);
  }

  @Authorized('ADMIN')
  @Mutation(returns => Boolean)
  async multipleUpload(
    @Arg('files', type => [GraphQLUpload]) files: [FileInput],
  ): Promise<boolean> {
    return await Promise.resolve(true);
  }
}
