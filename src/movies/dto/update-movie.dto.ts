import {
  IsEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class UpdateMovieDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(10)
  readonly rating: number;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
