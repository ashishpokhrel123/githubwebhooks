import { Body, Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(@Body() payload: any): {
    status: number;
    message: string;
    data: any;
  } {
    console.log(payload);

    if (payload && payload.repository && payload.commits) {
      const authorUsername = payload.sender.login;
      const authorFullName = payload.sender.fullName;
      const commitMessage = payload.commits[0].message;
      const commitDate = payload.commits[0].timestamp;

      return {
        status: HttpStatus.OK,
        message: 'Report generated successfully',
        data: {
          authorUsername: authorUsername || null,
          authorFullName: authorFullName || null,
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
