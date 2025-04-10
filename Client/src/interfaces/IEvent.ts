export interface IEvent {
    _id:string;
    title: string;
    summary: string;// summary
    aboutTheEvent: string[];
    description: string;
    tags:string[];
    /// organizors will be fetched by role
    type: string;
    format: string;
    date_time:{
        start:Date,
        end: Date,
        timezone:string
    };
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
    tickets:{
        name:string;
        price:number;
    }
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
