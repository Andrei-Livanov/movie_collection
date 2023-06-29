import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { UserDocument } from '../users/schemas/user.schema';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiBearerAuth()
  @Post('login')
  @ApiBody({ type: CreateUserDto })
  async login(@Request() req) {
    return this.authService.login(req.user as UserDocument);
  }

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }
}
