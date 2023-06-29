import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty({ default: 'The Silence of the Lambs' })
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(500)
  @ApiProperty({ default: 'thriller, detective, crime, drama, horror' })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(10)
  @ApiProperty({ default: 9 })
  rating: number;
}
