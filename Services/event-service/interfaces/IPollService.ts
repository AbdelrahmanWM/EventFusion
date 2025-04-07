import { IPoll } from "./IPoll";

export interface IPollService {
  getPoll(pollID: string): Promise<IPoll>;

  createPoll(
    eventID: string,
    question: string,
    options: string[],
    expiresAt: Date
  ): Promise<IPoll>;

  updateOptionVotes(pollID: string, optionName: string): Promise<IPoll>;

  closePoll(pollID: string): Promise<IPoll>;

  openPoll(pollID: string): Promise<IPoll>;
  
  deletePoll(pollID: string): Promise<IPoll>;
}
