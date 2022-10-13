import { join } from 'path';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

import { HelloWorldModule } from './hello-world/hello-world.module';
import { TodoResolver } from './todo/todo.resolver';
import { TodoModule } from './todo/todo.module';
import { TodoService } from './todo/todo.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // debug: false,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      plugins: [ApolloServerPluginLandingPageLocalDefault],
    }),
    HelloWorldModule,
    TodoModule,
  ],
  controllers: [],
  providers: [TodoResolver, TodoService],
})
export class AppModule {}
