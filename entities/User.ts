export type User = {
  screenName: string
  name: string | null
  description?: string | null
  profileBannerUrl?: string | null
  profileImageUrlHttps?: string | null
  url?: string | null
  instaId?: string | null
  isVerified: 'pending' | 'ok' | 'reject'
}
