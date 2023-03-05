export type EventCreate = {
  name: string
  isAllDay: boolean
  startDate: Date
  endDate: Date
  place: string
  description: string
}

export type Event = {
  id: string
} & EventCreate
