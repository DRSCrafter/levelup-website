export interface IIndexable<T = any> {
    [key: string]: T
}

export type StateEvolver = (key: string, value: any) => void

export interface ListItem {
    name: string,
    link: string,
    icon?: any
}