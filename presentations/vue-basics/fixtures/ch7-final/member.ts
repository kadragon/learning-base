export interface Member {
  id: number
  name: string
  role: '개발' | '기획' | '운영'
  team: string
  email?: string
}
