import { EventFormat } from "event-service/enums/eventFormat";
import { EventType } from "event-service/enums/EventType"

export interface IEvent {
    title: string;
    description: string;
    type: EventType;
    format: EventFormat;
    date_time:{
        start:Date,
        end: Date,
        timezone:string
    };
    location: string;
    agenda:Array<{
        session:string,time:Date,speaker:string
    }>;
    registration:{
        period_start:Date,
        period_end: Date,
    };
    stakeholders: string[];
    analytics:{
        total_registered:number;
    }
}