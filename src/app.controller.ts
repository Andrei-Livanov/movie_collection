import { AppService } from './app.service';
import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('swagger')
  getHello(): string {
    return this.appService.getHello();
  }
}
