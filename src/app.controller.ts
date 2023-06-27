import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { AppService } from './app.service';

interface CommitData {
  authorFullName: string | null;
  commitMessage: string | null;
  commitDate: string | null;
  enviroment:string | null;
}

@Controller()
export class AppController {
   constructor(private readonly appService: AppService) {}

  @Post()
  handlePostRequest(@Body() payload: any): { status: number; message: string } {
const { author, message, timestamp } = payload.head_commit;
const { default_branch} = payload.repository.default_branch;
    const commitData: CommitData = {
      authorFullName: author?.name || null,
      commitMessage: message || null,
      commitDate: timestamp || null,
      enviroment: default_branch || null,
    };

    this.appService.storeCommit(commitData);

    return {
      status: HttpStatus.OK,
      message: 'Commit saved successfully',
    };

  }

  @Get()
  handleGetRequest(): { status: number; message: string; data: CommitData[] | null } {
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

