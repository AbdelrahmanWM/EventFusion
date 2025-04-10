export interface IEvent {
    _id:string;
    title: string;
    summary: string;// summary
    aboutTheEvent: string[];
    description: string;
    tags:string[];
    /// organizors will be fetched by role
    type: EventType;
    format: string;
    date_time:{
        start:Date,
        end: Date,
        timezone:string
    };
    pictures:{
        coverPicture:string;
    },
    location: string;
    agenda:Array<ISession>;
    streamLink:string,
    venueInformation: string,
    // for the scoreboards store them in their own service
    // for the AI questions, small AI service
    eventChat:string, //reference event chat (done)
    registration:{
        period_start:Date,
        period_end: Date,
    };
    tickets:Array<{
        name:string;
        price:number;
    }>;
    promos:{name:string, discount:number}[];
    // stakeholders: string[];
}

export interface ISession{ 
    title: string; 
    startTime: string; 
    endTime: string; 
    speakers: string[]; 
    agenda: string 
}
export enum EventType {
  Conference = "Conference",
  Workshop = "Workshop",
  Seminar = "Seminar",
  Webinar = "Webinar"
}


export interface IChat {
  eventID: string; /// reference to events schema
  comments: Array<{
    username: string;
    userID: string; // reference to users schema;
    comment: string;
    date: Date;
    isHidden: boolean;
  }>;
}
