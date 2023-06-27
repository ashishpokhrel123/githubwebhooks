import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import redis from 'redis';

interface CommitData {
  authorFullName: string | null;
  commitMessage: string | null;
  commitDate: string | null;
}

@Controller()
export class AppController {
  private redisClient: any;

  constructor() {
    this.redisClient = redis.createClient();
  }

  @Post()
  handlePostRequest(@Body() payload: any): { status: number; message: string } {
    const commitHistoryKey = 'commitHistory';
    this.redisClient.rpush(commitHistoryKey, JSON.stringify(payload));
    return {
      status: HttpStatus.OK,
      message: 'Payload stored successfully',
    };
  }

  private async getCommitHistoryFromRedis(key: string): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      this.redisClient.lrange(key, 0, -1, (error, commitList) => {
        if (error) {
          reject(error);
        } else {
          resolve(commitList);
        }
      });
    });
  }

  @Get()
  async handleGetRequest(): Promise<{
    status: number;
    message: string;
    data: CommitData[] | null;
  }> {
    const commitHistoryKey = 'commitHistory';
    try {
      const commits = await this.getCommitHistoryFromRedis(commitHistoryKey);

      if (!commits || commits.length === 0) {
        return {
          status: HttpStatus.NO_CONTENT,
          message: 'No commits available',
          data: null,
        };
      }

      const parsedCommitsHistory: CommitData[] = commits.map((commit: string) =>
        JSON.parse(commit),
      );

      return {
        status: HttpStatus.OK,
        message: 'Commit data retrieved successfully from Redis',
        data: parsedCommitsHistory,
      };
    } catch (error) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving commit data from Redis',
        data: null,
      };
    }
  }
}
