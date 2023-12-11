import { PostEventName } from "./PostEvents"

export type EventName = PostEventName

// application layer
export interface EventQueue {
  publish(eventName: EventName, data: any): Promise<void>
  subscribe(eventName: EventName, handler: Function): Promise<void>
  unsubscribe(eventName: EventName, handler: Function): Promise<void>
}



