import { Body, Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(@Body() payload: any): { status: number; message: string; data: any } {
    if (payload && payload.repository && payload.commits && payload.head_commit) {
      const author = payload.sender.login;
      const commitMessage = payload.head_commit.message;
      const commitDate = payload.head_commit.timestamp;

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
