import {
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { User } from '../../auth/schemas/user.schema';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(10)
  readonly rating: number;

  @IsEmpty({ message: 'You cannot pass user id' })
  readonly user: User;
}
