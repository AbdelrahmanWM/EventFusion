import { IPoll } from "../interfaces/IPoll";
import PollModel from "event-service/models/poll";

class PollService {
  static instance: PollService | null = null;

  public static getInstance(): PollService {
    if (!PollService.instance) {
      PollService.instance = new PollService();
    }
    return PollService.instance;
  }

  private constructor() {}

  public async getPoll(pollID: string): Promise<IPoll> {
    try {
      const poll: IPoll | null = await PollModel.findById(pollID);
      if (!poll) {
        throw new Error("Poll not found.");
      }
      return poll;
    } catch (error: any) {
      throw new Error("Failed to fetch poll: " + error.message);
    }
  }

  public async createPoll(
    eventID: string,
    question: string,
    options: string[],
    expiresAt: Date
  ): Promise<IPoll> {
    try {
      const newPoll = new PollModel({
        eventID,
        question,
        options: options.map((option) => ({ option, votes: 0 })),
        expiresAt,
      });
      await newPoll.save();
      return newPoll;
    } catch (error: any) {
      throw new Error(`Failed to create poll: ${error.message}`);
    }
  }

  public async updateOptionVotes(
    pollID: string,
    optionName: string
  ): Promise<IPoll> {
    try {
      const poll: IPoll | null = await PollModel.findById(pollID);
      if (!poll) {
        throw new Error("Poll not found.");
      }

      const optionToUpdate = poll.options.find(
        (opt) => opt.option === optionName
      );
      if (!optionToUpdate) {
        throw new Error("Option not found.");
      }

      optionToUpdate.votes += 1; // Increment votes by 1
      await poll.save();
      return poll;
    } catch (error: any) {
      throw new Error("Failed to update poll option: " + error.message);
    }
  }

  public async closePoll(pollID: string): Promise<IPoll> {
    try {
      const poll: IPoll | null = await PollModel.findById(pollID);
      if (!poll) {
        throw new Error("Poll not found.");
      }
      poll.isOpen = false;
      await poll.save();
      return poll;
    } catch (error: any) {
      throw new Error("Failed to update poll option: " + error.message);
    }
  }
  public async openPoll(pollID: string): Promise<IPoll> {
    try {
      const poll: IPoll | null = await PollModel.findById(pollID);
      if (!poll) {
        throw new Error("Poll not found.");
      }
      poll.isOpen = true;
      await poll.save();
      return poll;
    } catch (error: any) {
      throw new Error("Failed to update poll option: " + error.message);
    }
  }
  public async deletePoll(pollID: string): Promise<IPoll> {
    try {
      const poll: IPoll | null = await PollModel.findByIdAndDelete(pollID);
      if (!poll) {
        throw new Error("Poll not found.");
      }
      return poll;
    } catch (error: any) {
      throw new Error(`Failed to delete poll: ${error.message}`);
    }
  }
}

export default PollService;
