import { Body, Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(@Body() payload: any): {
    status: number;
    message: string;
    data: any;
  } {
    const commitHistory = JSON.parse(JSON.stringify(payload));

    if (commitHistory && commitHistory.head_commit) {
      console.log("hello i am here")
      const authorFullName = commitHistory.author.name;
      const commitMessage = commitHistory.head_commit.message;
      const commitDate = commitHistory.head_commit.timestamp;

      return {
        status: HttpStatus.OK,
        message: 'Report generated successfully',
        data: {
          authorFullName: authorFullName || null,
          commitMessage: commitMessage || null,
          commitDate: commitDate || null,
        },
      };
    } else {
       console.log("hello i am there")
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'No data in payload',
        data: null,
      };
    }
  }
}
