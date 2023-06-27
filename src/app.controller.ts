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
  data: CommitData[] | null;
} {
  if (this.commitHistory.length === 0) {
    return {
      status: HttpStatus.NO_CONTENT,
      message: 'No commits yet, please deploy',
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
    message: 'Commits retrieved successfully',
    data: commitDataList,
  };
}

  @Get('/commits')
  getAllCommits(): { status: number; message: string; data: any[] } {
    if (this.commitHistory.length === 0) {
      return {
        status: HttpStatus.NO_CONTENT,
        message: 'No commit data available',
        data: [],
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'All commits retrieved successfully',
      data: this.commitHistory,
    };
  }
}
