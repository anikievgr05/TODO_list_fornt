export interface Tracker {
    id: number,
    name: string,
    project_id: string
}
export interface InitTracker {
    id: null,
    name: null,
    project_id: number
}
export interface Trackers {
    data: Tracker[]
}
export interface TrackerID {
    id: number
}