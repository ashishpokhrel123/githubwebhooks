import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface CommitData {
  authorFullName: string | null;
  commitMessage: string | null;
  commitDate: Date | null;
}
function formatDateToWords(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  handlePostRequest(@Body() payload: any): { status: number; message: string } {
    const { author, message, timestamp } = payload.head_commit;
    const commitData: CommitData = {
      authorFullName: author?.name || null,
      commitMessage: message || null,
      commitDate: new Date(timestamp) || null,
    };

    this.appService.storeCommit(commitData);

    return {
      status: HttpStatus.OK,
      message: 'Commit stored succesfully',
    };
  }

  @Get()
  handleGetRequest(): {
    status: number;
    message: string;
    data: CommitData[] | null;
  } {
    const commitHistory = this.appService.getAllCommits();

    if (commitHistory.length === 0) {
      return {
        status: HttpStatus.NO_CONTENT,
        message: 'No commit  available',
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'All commits retrieved successfully',
      data: commitHistory,
    };
  }
}
