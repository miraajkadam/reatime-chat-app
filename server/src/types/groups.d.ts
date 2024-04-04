export type GetAllGroupsType = {
  id: string
  name: string
}[]

export type GroupType = {
  name: string
  users: {
    id: string
    name: string
    email: string
  }[]
}
