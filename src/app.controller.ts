import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';

@Controller()
export class AppController {
  @Post()
  getHello(@Body() payload: any): { status: number; message: string; data: any } {
    console.log(payload)
    if (payload && payload.repository && payload.commits) {
      const author = payload.sender.login;
      const commitMessage = payload.commits.message;
      const commitDate = payload.commits.timestamp;

      return {
        status: HttpStatus.OK,
        message: 'Report generated successfully',
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
      data: null,
    };
  }
}
