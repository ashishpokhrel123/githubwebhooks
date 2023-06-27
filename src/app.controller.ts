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
     console.log(this.commitHistory, "cm")
    return {
      status: HttpStatus.OK,
      message: 'Payload stored successfully',
    };
  }

  @Get()
  handleGetRequest(): { status: number; message: string; data: CommitData | null } {
    console.log(this.commitHistory, "comm")

      const { author, message, timestamp } = this.commitHistory.repository.head_commit;

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
