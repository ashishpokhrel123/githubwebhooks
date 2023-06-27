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
    this.commitHistory.push(payload);
    return {
      status: HttpStatus.OK,
      message: 'Payload stored successfully',
    };
  }

  @Get()
  handleGetRequest(): { status: number; message: string; data: CommitData[] | null } {
    if (!this.commitHistory) {
      return {
        status: HttpStatus.NO_CONTENT,
        message: 'No commit data available',
        data: null,
      };
    }

    const commitDataList: CommitData[] = this.commitHistory.map(commit => {
      const { author, message, timestamp } = commit.head_commit;

      return {
        authorFullName: author?.name || null,
        commitMessage: message || null,
        commitDate: timestamp || null,
      };
    });

    return {
      status: HttpStatus.OK,
      message: 'All commits retrieved successfully',
      data: commitDataList,
    };
  }
}
