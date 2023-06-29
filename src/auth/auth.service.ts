import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { UserDocument } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async register(dto: CreateUserDto) {
    try {
      const userData = await this.userService.create(dto);

      return { token: this.jwtService.sign({ id: userData.id }) };
    } catch (err) {
      console.log(err);
      throw new ForbiddenException('Registration error');
    }
  }

  async login(user: UserDocument) {
    return { token: this.jwtService.sign({ id: user.id }) };
  }
}
