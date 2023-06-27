import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';

interface CommitData {
  authorFullName: string | null;
  commitMessage: string | null;
  commitDate: string | null;
}

@Controller()
export class AppController {
  private commitHistory: any[] = [];

  @Post()
  handlePostRequest(@Body() payload: any): { status: number; message: string } {
    this.commitHistory = payload;
    return {
      status: HttpStatus.OK,
      message: 'Payload stored successfully',
    };
  }

  @Get()
  handleGetRequest(): {
    status: number;
    message: string;
    data: CommitData | null;
  } {
    if (this.commitHistory.length === 0) {
      return {
        status: HttpStatus.NO_CONTENT,
        message: 'No commit data available',
        data: null,
      };
    }
    const latestCommit = this.commitHistory[this.commitHistory.length - 1];
    const { author, message, timestamp } = latestCommit.head_commit;

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
  }
}
