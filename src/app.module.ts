import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost:27017/movies'),
    AuthModule,
    MoviesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
