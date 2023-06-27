import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';

interface CommitData {
  authorFullName: string | null;
  commitMessage: string | null;
  commitDate: string | null;
}

@Controller()
export class AppController {
  private commitHistory: any;

  @Post()
  handlePostRequest(@Body() payload: any): { status: number; message: string } {
    this.commitHistory = payload;
    return {
      status: HttpStatus.OK,
      message: 'Payload stored successfully',
    };
  }

  @Get()
  handleGetRequest(): { status: number; message: string; data: CommitData | null } {
    if (this.commitHistory && this.commitHistory.head_commit) {
      const { author, message, timestamp } = this.commitHistory.head_commit;

      const data: CommitData = {
        authorFullName: author?.name || null,
        commitMessage: message || null,
        commitDate: timestamp || null,
      };

      return {
        status: HttpStatus.OK,
        message: 'Report generated successfully',
        data,
      };
    } else {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'No data in payload',
        data: null,
      };
    }
  }
}
