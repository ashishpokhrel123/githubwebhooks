import { Injectable } from '@nestjs/common';
interface CommitData {
  authorFullName: string | null;
  commitMessage: string | null;
  commitDate: Date | null;
}

@Injectable()
export class AppService {
  private commitHistory: CommitData[] = [];

  storeCommit(commit: CommitData): void {
    this.commitHistory.push(commit);
  }

  getAllCommits(): CommitData[] {
    return this.commitHistory;
  }

}
