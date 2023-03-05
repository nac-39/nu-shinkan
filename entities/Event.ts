export type EventCreate = {
  name: string
  isAllDay?: boolean
  startDate?: Date | null
  endDate?: Date | null
  place?: string
  description?: string
}

export type Event = {
  id: string
} & EventCreate
