export type EventCreate = {
  name: string
  clubName: string | null
  clubImagePath: string | null
  startDate: Date
  endDate?: Date
  place?: string
  description?: string
  webSiteUrl?: string
}

export type Event = {
  id: string
} & EventCreate
