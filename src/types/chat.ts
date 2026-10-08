export type Citation={id:string;title:string;source:string;excerpt:string};
export type Approval={id:string;order_id:string;amount:number;currency:string;status:string};
export type ChatResponse={conversation_id:string;answer:string;citations:Citation[];approval:Approval|null;trace_id:string};
export type StreamEvent={event:string;data:Record<string,unknown>};
