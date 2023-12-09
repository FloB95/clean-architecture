import { EventName, EventQueue } from '../interfaces/event'

// infrastructure layer
class LocalEventQueue implements EventQueue {
  private events: { [key: string]: Function[] } = {}
  private queue: { eventName: EventName; data: any }[] = []

  constructor() {
    // process events every 1000 milliseconds
    setInterval(() => this.processEvents(), 1000)
  }

  async publish(eventName: EventName, data: any): Promise<void> {
    this.queue.push({ eventName, data })
  }

  async subscribe(eventName: EventName, handler: Function): Promise<void> {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(handler)
  }

  async unsubscribe(eventName: EventName, handler: Function): Promise<void> {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (h) => h !== handler
      )
    }
  }

  private processEvents() {
    while (this.queue.length > 0) {
      const { eventName, data } = this.queue.shift()!
      if (this.events[eventName]) {
        this.events[eventName].forEach((handler) => handler(data))
      }
    }
  }
}

const localEventQueue = new LocalEventQueue()

export default localEventQueue
