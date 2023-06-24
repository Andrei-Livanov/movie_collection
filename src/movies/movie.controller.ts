import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Movie } from './schemas/movie.schema';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Controller('movies')
@ApiTags('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAllMovies(@Query() query: ExpressQuery): Promise<Movie[]> {
    return this.movieService.findAll(query);
  }

  @Get('/rating')
  async getMoviesSortedByRating(): Promise<Movie[]> {
    return this.movieService.getSortedByRating();
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async createMovie(
    @Body()
    movie: CreateMovieDto,
    @Req() req,
  ): Promise<Movie> {
    return this.movieService.create(movie, req.user);
  }

  @Get(':id')
  async getMovie(
    @Param('id')
    id: string,
  ): Promise<Movie> {
    return this.movieService.findById(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async updateMovie(
    @Param('id')
    id: string,
    @Body()
    movie: UpdateMovieDto,
  ) {
    return this.movieService.updateById(id, movie);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  async deleteMovie(
    @Param('id')
    id: string,
  ) {
    return this.movieService.deleteById(id);
  }
}
