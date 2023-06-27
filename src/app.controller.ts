import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Body() payload: any): {status:number, message:string, data: { author:string , commitMessage:string, commitDate:string }} {
   if (payload) {
      const author = payload.full_name;
      const commitMessage = payload.commits.message;
      const commitDate = payload.head_commits.timestamp;

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
      data:null
    };
  }


  
}
