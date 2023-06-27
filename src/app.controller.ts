import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';

interface CommitData {
  authorFullName: string | null;
  commitMessage: string | null;
  commitDate: string | null;
}

@Controller()
export class AppController {
  private commitHistory: any = null;

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
    if (!this.commitHistory.head_commit) {
      return {
        status: HttpStatus.NO_CONTENT,
        message: 'No commit data available',
        data: null,
      };
    }

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
  }
}
