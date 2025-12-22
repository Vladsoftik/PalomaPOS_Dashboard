export interface App {
  id: string
  label: string
  url: string
  icon: string
  subItems?: AppSubItem[]
}

export interface AppSubItem {
  id: string
  label: string
  path: string
  url: string
}

