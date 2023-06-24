import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './movie.controller';
import { MovieSchema } from './schemas/movie.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
