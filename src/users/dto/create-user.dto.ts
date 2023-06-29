import { Allow } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @Allow()
  @ApiProperty({ default: 'Jonny English' })
  fullName: string;

  @Allow()
  @ApiProperty({ default: 'test@mail.ru' })
  email: string;

  @Allow()
  @ApiProperty({ default: '12345' })
  password: string;
}
