import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('generatedReport')
  async generatedReport(@Body() payload: any) {
    if (payload && payload.head_commit) {
      const author = payload.head_commit.author.name;
      const commitMessage = payload.head_commit.message;
      const commitDate = payload.head_commit.timestamp;

      return {
        status: HttpStatus.OK,
        message: 'Report generated succesfully',
        data: {
          author: author || null,
          commitMessage: commitMessage || null,
          commitDate: commitDate || null,
        },
      };
    }
    return {
      status: HttpStatus.NOT_FOUND,
      message: 'No data in payload',
    };
  }
}
