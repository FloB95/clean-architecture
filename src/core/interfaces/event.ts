import { PostEventName } from '../../modules/post/events'

export type EventName = PostEventName

// application layer
export interface EventQueue {
  publish(eventName: EventName, data: any): Promise<void>
  subscribe(eventName: EventName, handler: Function): Promise<void>
  unsubscribe(eventName: EventName, handler: Function): Promise<void>
}



