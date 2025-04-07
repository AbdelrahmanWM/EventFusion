import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../../shared/utilities/Response";
import { IPollService } from "../interfaces/IPollService";

// Dependency Injection Pattern
// Injecting an instance of IPollService into each route handler function
// Allows for easier mock testing/ swapping of poll service if needed

export class PollController {
  private static instance: PollController;

  pollService: IPollService;

  private constructor(pollService: IPollService) {
    this.pollService = pollService;
  }

  public static getInstance(pollService: IPollService): PollController {
    if (!PollController.instance) {
      PollController.instance = new PollController(pollService);
    }
    return PollController.instance;
  }

  public getPoll = async (req: Request, res: Response): Promise<void> => {
    const { pollID } = req.params;
    try {
      const poll = await this.pollService.getPoll(pollID);
      sendSuccessResponse(res, "Successfully fetched poll details.", poll, 200);
    } catch (error) {
      sendErrorResponse(res, "Poll not found.", error, 404);
    }
  };

  public createPoll = async (req: Request, res: Response): Promise<void> => {
    const { eventID, question, options, expiresAt } = req.body;
    try {
      const poll = await this.pollService.createPoll(eventID, question, options, new Date(expiresAt));
      sendSuccessResponse(res, "Successfully created the poll.", poll, 201);
    } catch (error) {
      sendErrorResponse(res, "Failed to create poll.", error, 500);
    }
  };

  public updateOptionVotes = async (req: Request, res: Response): Promise<void> => {
    const { pollID } = req.params;
    const { optionName } = req.body;
    try {
      const updatedPoll = await this.pollService.updateOptionVotes(pollID, optionName);
      sendSuccessResponse(res, "Successfully updated poll votes.", updatedPoll, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to update poll votes.", error, 500);
    }
  };

  public closePoll = async (req: Request, res: Response): Promise<void> => {
    const { pollID } = req.params;
    try {
      const closedPoll = await this.pollService.closePoll(pollID);
      sendSuccessResponse(res, "Successfully closed the poll.", closedPoll, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to close poll.", error, 500);
    }
  };

  public openPoll = async (req: Request, res: Response): Promise<void> => {
    const { pollID } = req.params;
    try {
      const openedPoll = await this.pollService.openPoll(pollID);
      sendSuccessResponse(res, "Successfully opened the poll.", openedPoll, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to open poll.", error, 500);
    }
  };

  public deletePoll = async (req: Request, res: Response): Promise<void> => {
    const { pollID } = req.params;
    try {
      const deletedPoll = await this.pollService.deletePoll(pollID);
      sendSuccessResponse(res, "Successfully deleted the poll.", deletedPoll, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to delete poll.", error, 500);
    }
  };
}

export default PollController;
