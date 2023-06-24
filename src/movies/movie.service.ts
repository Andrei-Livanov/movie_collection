import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './schemas/movie.schema';
import { Query } from 'express-serve-static-core';
import { User } from '../auth/schemas/user.schema';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie.name)
    private movieModel: mongoose.Model<Movie>,
  ) {}

  async findAll(query: Query): Promise<Movie[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    return this.movieModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
  }

  async getSortedByRating(): Promise<Movie[]> {
    return this.movieModel.find().sort('rating');
  }

  async create(movie: Movie, user: User): Promise<Movie> {
    const data = Object.assign(movie, { user: user._id });

    return await this.movieModel.create(data);
  }

  async findById(id: string): Promise<Movie> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Please enter correct id.');
    }

    const movie = await this.movieModel.findById(id);

    if (!movie) {
      throw new NotFoundException('Movie not found.');
    }

    return movie;
  }

  async updateById(id: string, movie: Movie) {
    await this.movieModel.findByIdAndUpdate(id, movie, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string) {
    await this.movieModel.findByIdAndDelete(id);
  }
}
