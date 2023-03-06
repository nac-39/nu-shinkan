export type EventCreate = {
  name: string
  clubName: string | null
  clubImagePath: string | null
  isAllDay?: boolean
  startDate?: Date | null
  endDate?: Date | null
  place?: string
  description?: string
  webSiteUrl?: string
}

export type Event = {
  id: string
} & EventCreate
