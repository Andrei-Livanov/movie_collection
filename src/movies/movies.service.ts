import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie, MovieDocument } from './schemas/movie.schema';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async create(dto: CreateMovieDto): Promise<MovieDocument> {
    const movie = new this.movieModel(dto);
    return movie.save();
  }

  async findAll(): Promise<MovieDocument[]> {
    return this.movieModel.find().exec();
  }

  async findSortedByRating(): Promise<MovieDocument[]> {
    return this.movieModel.find().sort('-rating').exec();
  }

  async findById(id: string): Promise<MovieDocument> {
    return this.movieModel.findById(id);
  }

  async update(id: string, dto: UpdateMovieDto): Promise<MovieDocument> {
    return this.movieModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async remove(id: string) {
    return this.movieModel.findByIdAndDelete(id).exec();
  }
}
