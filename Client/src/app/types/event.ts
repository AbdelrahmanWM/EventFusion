export interface Event {
    id: string;
    title: string;
    description: string;
    venue: string;
    startTime: string;
    endTime: string;
    date: Date;
    agenda?: string;
  }