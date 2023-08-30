//@ts-ignore
import { Category } from '@fnd-store-api/core';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(Category);

    return this.appService.getHello();
  }
}
