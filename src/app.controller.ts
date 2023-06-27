import { Body, Controller, Get, HttpStatus } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(@Body() payload: any): {
    status: number;
    message: string;
    data: any;
  } {
    if (!payload || !payload.head_commit) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'No data',
        data: null,
      };
    }

    const { author, head_commit } = payload;
    const { name } = author || {};
    const { message: commitMessage, timestamp: commitDate } = head_commit;

    return {
      status: HttpStatus.OK,
      message: 'Report generated successfully',
      data: {
        authorFullName: name || null,
        commitMessage: commitMessage || null,
        commitDate: commitDate || null,
      },
    };
  }
}
