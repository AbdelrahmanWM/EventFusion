import { EventFormat } from "event-service/enums/eventFormat";
import { EventType } from "event-service/enums/eventType";
import { Document } from "mongoose";
import { ISession } from "./ISession";

export interface IEvent extends Document{
    title: string;
    summary: string;// summary
    aboutTheEvent: string[];
    description: string;
    tags:string[];
    /// organizors will be fetched by role
    type: EventType;
    format: EventFormat;
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