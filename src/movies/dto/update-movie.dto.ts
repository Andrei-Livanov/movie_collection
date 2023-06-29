import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateMovieDto extends PartialType(CreateMovieDto) {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  description: string;
}
