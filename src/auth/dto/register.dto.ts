import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    default: 'John',
  })
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  @ApiProperty({
    default: 'test@mail.ru',
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({ default: '12345' })
  readonly password: string;
}
